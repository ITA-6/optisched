# schedule/management/commands/genetic_algorithm.py
import pygad
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from room.models import Room
from professor.models import Professor
from curriculum.models import Curriculum
from section.models import Section
import json
from pathlib import Path
from django.core.serializers.json import (
    DjangoJSONEncoder,
)
from django.core.cache import cache
from constraint.models import Constraint
from datetime import datetime, timedelta, date
from django.db import models


class GeneticAlgorithmRunner:
    def __init__(self):
        # Load constraint settings for start and end times
        self.constraints = (
            Constraint.objects.first()
        )  # Assuming a single constraint instance
        self.start_time = datetime.combine(date.min, self.constraints.start_time)
        self.end_time = datetime.combine(date.min, self.constraints.end_time)

        # Semester filter
        self.semester = self.constraints.semester

        # Load data from models
        self.rooms = list(Room.objects.filter(is_active=True))
        self.professors = list(Professor.objects.filter(is_active=True))
        self.sections = list(
            Section.objects.filter(
                is_active=True,
                program__curriculum__isnull=False,  # Ensures the curriculum exists
                program__curriculum__year_level=models.F(
                    "year_level"
                ),  # Matches the year level
                program__curriculum__semester=self.semester,  # Matches the semester constraint
            ).distinct()  # Removes duplicates in case of multiple curriculums
        )

        # Calculate time slots based on constraint-defined time range
        time_interval = timedelta(minutes=30)  # 30-minute intervals
        total_minutes = (self.end_time - self.start_time).seconds // 60
        self.TIME_SLOTS = (
            total_minutes // 30
        )  # Number of 30-minute slots between start_time and end_time

        # Map each time slot to an actual time
        self.times = [
            self.start_time + i * time_interval for i in range(self.TIME_SLOTS)
        ]

        # Track room availability dynamically for each day and time slot
        self.available_rooms = {
            day: {slot: set(self.rooms) for slot in range(self.TIME_SLOTS)}
            for day in range(6)  # 6 days in the week (Monday to Saturday)
        }

        self.DAY_PAIRS = {
            0: (0, 3),  # Monday and Thursday
            1: (1, 4),  # Tuesday and Friday
            2: (2, 5),  # Wednesday and Saturday
        }

        # Progress tracking
        self.progress = 0
        self.total_sections = len(self.sections)

        # PyGAD parameters
        self.num_generations = 200
        self.num_parents_mating = 4
        self.sol_per_pop = 10
        self.num_genes = 5  # Each gene represents a single course (course, professor, room, day_pair, timeslot)

    def generate_schedule_for_section(self, section, curriculum_courses):
        """
        Generate a schedule for a specific section using genetic algorithms, focusing on predefined courses.
        """
        if not curriculum_courses:
            print(
                f"Warning: No courses found in the curriculum for section {section.year_level}{section.label} - {section.program.acronym}. Skipping..."
            )
            return []

        # Define the gene space for PyGAD (excluding course index since courses are predefined)
        gene_space = [
            {"low": 0, "high": len(self.professors) - 1},  # Professor index
            {"low": 0, "high": len(self.rooms) - 1},  # Room index
            {"low": 0, "high": len(self.DAY_PAIRS) - 1},  # Day pair index
            {"low": 0, "high": self.TIME_SLOTS - 1},  # Timeslot
        ] * len(curriculum_courses)

        def fitness_func(ga_instance, solution, solution_idx):
            """
            Fitness function to evaluate the quality of a solution with dynamic room availability.
            """
            fitness = 0

            professor_daily_times = {
                prof: {day: [] for day in range(6)} for prof in self.professors
            }
            section_day_times = {
                day: [] for day in range(6)
            }  # Tracks timeslots per day for the section

            professor_units = {prof: 0 for prof in self.professors}
            buffer = timedelta(minutes=10)  # Buffer time between consecutive classes

            for idx, course in enumerate(curriculum_courses):
                professor = self.professors[
                    int(solution[idx * 4]) % len(self.professors)
                ]
                day_pair_idx = int(solution[idx * 4 + 2]) % len(self.DAY_PAIRS)
                timeslot = int(solution[idx * 4 + 3]) % self.TIME_SLOTS

                day_pair = self.DAY_PAIRS[day_pair_idx]
                lecture_day, lab_day = day_pair

                # ** Lecture Room Assignment **
                if self.available_rooms[lecture_day][timeslot]:
                    room = self.available_rooms[lecture_day][
                        timeslot
                    ].pop()  # Assign first available room
                else:
                    fitness -= 50  # Penalize heavily if no room is available
                    continue

                # Calculate lecture time range
                lecture_start_time = self.times[timeslot]
                lecture_end_time = lecture_start_time + timedelta(
                    hours=course.lecture_unit
                )

                # ** Section Schedule Check **
                for scheduled_start, scheduled_end in section_day_times[lecture_day]:
                    if not (
                        lecture_end_time <= scheduled_start
                        or lecture_start_time >= scheduled_end
                    ):
                        fitness -= 30  # Penalize overlap in section schedule
                        break
                else:
                    section_day_times[lecture_day].append(
                        (lecture_start_time, lecture_end_time)
                    )
                    fitness += 10  # Reward valid section schedule

                # ** Professor Availability Check **
                is_professor_available = True
                for scheduled_start, scheduled_end in professor_daily_times[professor][
                    lecture_day
                ]:
                    if not (
                        lecture_end_time + buffer <= scheduled_start
                        or lecture_start_time - buffer >= scheduled_end
                    ):
                        is_professor_available = False
                        fitness -= 20  # Penalize professor double-booking
                        break

                if is_professor_available:
                    professor_daily_times[professor][lecture_day].append(
                        (lecture_start_time, lecture_end_time)
                    )
                    professor_units[professor] += course.lecture_unit
                    fitness += 10  # Reward valid professor assignment

                # ** Lab Scheduling **
                if course.lab_unit > 0:
                    lab_timeslot = (
                        timeslot + course.lecture_unit * 2
                    ) % self.TIME_SLOTS
                    lab_start_time = self.times[lab_timeslot]
                    lab_end_time = lab_start_time + timedelta(hours=course.lab_unit)

                    # Check lab room availability
                    if self.available_rooms[lab_day][lab_timeslot]:
                        lab_room = self.available_rooms[lab_day][
                            lab_timeslot
                        ].pop()  # Assign first available lab room
                    else:
                        fitness -= 50  # Penalize heavily if no lab room is available
                        continue

                    # Check lab schedule overlaps
                    for scheduled_start, scheduled_end in section_day_times[lab_day]:
                        if not (
                            lab_end_time <= scheduled_start
                            or lab_start_time >= scheduled_end
                        ):
                            fitness -= 30  # Penalize lab schedule overlap
                            break
                    else:
                        section_day_times[lab_day].append(
                            (lab_start_time, lab_end_time)
                        )
                        fitness += 10  # Reward valid lab schedule

            # Penalize professors exceeding workloads
            for prof, units in professor_units.items():
                if units > (prof.required_units or 0):
                    fitness -= 50  # Penalize exceeding workload
                else:
                    fitness += 20  # Reward balanced workloads

            return fitness

        # Initialize the PyGAD instance
        try:
            ga_instance = pygad.GA(
                num_generations=self.num_generations,
                num_parents_mating=self.num_parents_mating,
                fitness_func=fitness_func,
                sol_per_pop=self.sol_per_pop,
                num_genes=len(curriculum_courses)
                * 4,  # 4 genes per course (professor, room, day pair, timeslot)
                gene_space=gene_space,
                parent_selection_type="sss",
                crossover_type="single_point",
                mutation_type="random",
                mutation_percent_genes=10,
            )
        except ValueError as e:
            print(f"Error initializing PyGAD for section {section.label}: {e}")
            return []

        # Run the genetic algorithm
        ga_instance.run()
        solution, _, _ = ga_instance.best_solution()

        # Build the schedule
        schedule = []
        for idx, course in enumerate(curriculum_courses):
            professor = self.professors[int(solution[idx * 4]) % len(self.professors)]
            room = self.rooms[int(solution[idx * 4 + 1]) % len(self.rooms)]
            day_pair = self.DAY_PAIRS[int(solution[idx * 4 + 2]) % len(self.DAY_PAIRS)]
            timeslot = int(solution[idx * 4 + 3]) % self.TIME_SLOTS

            schedule.append((course, professor, room, day_pair, timeslot))

        return schedule

    def format_time_range(self, start_slot, duration_hours):
        """Format a time range given a start slot and duration in hours, respecting the constraint end time."""
        start_time = self.times[start_slot]
        end_time = start_time + timedelta(hours=duration_hours)

        # Ensure end_time does not exceed constraint-defined end time
        if end_time > self.end_time:
            end_time = self.end_time

        return f"{start_time.strftime('%I:%M %p')} - {end_time.strftime('%I:%M %p')}"

    def format_schedule_output(self, section, curriculum, schedule):
        day_mapping = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ]
        formatted_courses = []

        for entry in schedule:
            course, professor, room, day_pair, timeslot = entry
            lecture_day, lab_day = day_pair

            lecture_time_range = self.format_time_range(timeslot, course.lecture_hours)

            if course.lab_unit > 0:
                lab_timeslot = (timeslot + course.lecture_hours * 2) % self.TIME_SLOTS
                lab_room = self.rooms[(self.rooms.index(room) + 1) % len(self.rooms)]
                lab_time_range = self.format_time_range(lab_timeslot, course.lab_hours)

                course_entry = {
                    "professor_name": f"{professor.first_name} {professor.last_name}",
                    "course_code": course.code,
                    "course_description": course.name,
                    "lecture_units": course.lecture_unit,
                    "lab_units": course.lab_unit,
                    "lecture_time_range": lecture_time_range,
                    "lab_time_range": lab_time_range,
                    "lecture_day_of_week": day_mapping[lecture_day],
                    "lab_day_of_week": day_mapping[lab_day],
                    "building_name": room.building.name,
                    "lecture_room_number": room.number,
                    "lab_room_number": lab_room.number,
                }
            else:
                course_entry = {
                    "professor_name": f"{professor.first_name} {professor.last_name}",
                    "course_code": course.code,
                    "course_description": course.name,
                    "lecture_units": course.lecture_unit,
                    "lab_units": course.lab_unit,
                    "lecture_time_range": lecture_time_range,
                    "lab_time_range": "Time Not Assigned",
                    "lecture_day_of_week": day_mapping[lecture_day],
                    "lab_day_of_week": "Day Not Assigned",
                    "building_name": room.building.name,
                    "lecture_room_number": room.number,
                    "lab_room_number": "Room Not Assigned",
                }
            formatted_courses.append(course_entry)

        return {
            "year_level": section.year_level,
            "semester": curriculum.semester,
            "program_name": section.program.name
            if section.program
            else "Unknown Program",
            "department_name": section.department.name
            if section.department
            else "Unknown Department",
            "section_label": section.label,
            "courses": formatted_courses,
        }

    def serialize_schedule(self, schedule, section, semester):
        """Convert generated schedule data into a JSON-serializable format that aligns with the model structure."""
        serialized_schedule = {
            "year_level": section.year_level,
            "semester": semester,
            "program_id": section.program.id if section.program else None,
            "department_id": section.department.id if section.department else None,
            "section_id": section.id,
            "is_active": True,
            "courses": [],
        }

        for entry in schedule:
            course, professor, room, day_pair, timeslot = entry

            # Convert day_pair and timeslot information to align with TimeSlot
            lecture_day, lab_day = day_pair
            lecture_start_hour = 7 + (timeslot // 2)
            lecture_start_minute = 30 if timeslot % 2 else 0
            lecture_end_hour = lecture_start_hour + course.lecture_unit

            # Construct lecture time slot details
            lecture_time_slot = {
                "day_of_week": lecture_day,
                "start_time": f"{lecture_start_hour:02}:{lecture_start_minute:02}",
                "end_time": f"{lecture_end_hour:02}:{lecture_start_minute:02}",
            }

            lab_time_slot = None
            if course.lab_unit > 0:
                # Calculate lab timeslot if applicable
                lab_timeslot = (timeslot + course.lecture_unit * 2) % self.TIME_SLOTS
                lab_start_hour = 7 + (lab_timeslot // 2)
                lab_start_minute = 30 if lab_timeslot % 2 else 0
                lab_end_hour = lab_start_hour + course.lab_unit

                lab_time_slot = {
                    "day_of_week": lab_day,
                    "start_time": f"{lab_start_hour:02}:{lab_start_minute:02}",
                    "end_time": f"{lab_end_hour:02}:{lab_start_minute:02}",
                }

            serialized_course = {
                "course_id": course.id,
                "professor_id": professor.id if professor else None,
                "lecture_room_id": room.id if room else None,
                "lab_room_id": room.id if course.lab_unit > 0 and room else None,
                "lecture_time_range": lecture_time_slot,
                "lab_time_range": lab_time_slot,
            }

            serialized_schedule["courses"].append(serialized_course)

        return serialized_schedule

    def save_all_schedules_to_json(self, all_schedules):
        """Save all generated schedules to a JSON file and cache the data."""
        # Define the file path for saving the JSON data
        file_path = Path("generated_schedules.json")

        # Write the schedule data to a JSON file
        with file_path.open("w") as file:
            json.dump(all_schedules, file, cls=DjangoJSONEncoder, indent=4)

        # Cache the JSON content itself
        cache.set(
            "all_generated_schedules", all_schedules, timeout=60 * 60 * 24
        )  # 24-hour cache

    def update_progress(self, current_index):
        """Update progress and store it in the cache."""
        if self.total_sections > 0:
            self.progress = int((current_index + 1) / self.total_sections * 100)
            cache.set("schedule_generation_progress", self.progress, timeout=60 * 10)

    def run(self):
        all_schedules = {}  # Dictionary to accumulate schedules for all sections
        output = []

        def worker(section):
            """Worker function to process a single section."""
            try:
                # Filter curriculum based on year_level, program, and specified semester
                curriculum = Curriculum.objects.filter(
                    year_level=section.year_level,
                    program=section.program,
                    semester=self.semester,
                ).first()

                if not curriculum:
                    print(
                        f"No curriculum found for section {section.year_level}{section.label} - {section.program.acronym}. Skipping..."
                    )
                    return None  # Skip if no matching curriculum is found

                curriculum_courses = list(curriculum.courses.all())

                # Generate the raw schedule for the section
                raw_schedule = self.generate_schedule_for_section(
                    section, curriculum_courses
                )

                # Serialize the raw schedule for JSON storage
                serialized_schedule = self.serialize_schedule(
                    raw_schedule, section, self.semester
                )

                # Format the schedule for output
                formatted_section_schedule = self.format_schedule_output(
                    section, curriculum, raw_schedule
                )

                return section.id, serialized_schedule, formatted_section_schedule

            except Exception as e:
                print(f"Error processing section {section.label}: {e}")
                return None

        # Use ThreadPoolExecutor to process sections in parallel
        with ThreadPoolExecutor(
            max_workers=2 * os.cpu_count()
        ) as executor:  # Adjust the number of workers as needed
            futures = {
                executor.submit(worker, section): section for section in self.sections
            }

            for future in as_completed(futures):
                result = future.result()
                if result:
                    section_id, serialized_schedule, formatted_section_schedule = result
                    all_schedules[section_id] = serialized_schedule
                    output.append(formatted_section_schedule)

                # Update progress after each section is processed
                processed_sections = len(output)
                self.progress = int((processed_sections / self.total_sections) * 100)
                cache.set(
                    "schedule_generation_progress", self.progress, timeout=60 * 10
                )

        # Save all raw schedules to a single JSON file and cache the result
        self.save_all_schedules_to_json(all_schedules)

        # Ensure progress is set to 100% when all sections are processed
        self.progress = 100
        cache.set("schedule_generation_progress", self.progress, timeout=60 * 10)

        return output
