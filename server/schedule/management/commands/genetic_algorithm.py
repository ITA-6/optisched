# schedule/management/commands/genetic_algorithm.py
import pygad
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


class GeneticAlgorithmRunner:
    def __init__(self, semester="FIRST_SEMESTER"):
        # Load data from models
        self.rooms = list(Room.objects.filter(is_active=True))
        self.professors = list(Professor.objects.filter(is_active=True))
        self.sections = list(Section.objects.filter(is_active=True))

        # Load constraint settings for start and end times
        self.constraints = (
            Constraint.objects.first()
        )  # Assuming a single constraint instance
        self.start_time = datetime.combine(date.min, self.constraints.start_time)
        self.end_time = datetime.combine(date.min, self.constraints.end_time)

        # Semester filter
        self.semester = semester

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

        self.DAY_PAIRS = {
            0: (0, 3),  # Monday and Thursday
            1: (1, 4),  # Tuesday and Friday
            2: (2, 5),  # Wednesday and Saturday
        }

        # PyGAD parameters
        self.num_generations = 200
        self.num_parents_mating = 4
        self.sol_per_pop = 10
        self.num_genes = 5  # Each gene represents a single course (course, professor, room, day_pair, timeslot)

    def generate_schedule_for_section(self, section, curriculum_courses):
        # Gene space definition
        gene_space = [
            {"low": 0, "high": len(curriculum_courses) - 1},  # Course index
            {"low": 0, "high": len(self.professors) - 1},  # Professor index
            {"low": 0, "high": len(self.rooms) - 1},  # Room index
            {"low": 0, "high": len(self.DAY_PAIRS) - 1},  # Day pair index
            {"low": 0, "high": self.TIME_SLOTS - 1},  # Timeslot
        ] * len(curriculum_courses)

        # Fitness function setup for the current section
        def fitness_func(ga_instance, solution, solution_idx):
            fitness = 0
            course_schedule = {}
            professor_units = {prof: 0 for prof in self.professors}
            assigned_courses = set()  # Track assigned courses to prevent duplicates
            daily_units = {
                day: 0 for day in range(6)
            }  # Track units per day (Monday to Saturday)

            # Track occupied times for each room and professor per day for overlap checks
            section_day_times = {
                day: [] for day in range(6)
            }  # Track timeslots per day for section to prevent overlap
            professor_daily_times = {
                prof: {day: [] for day in range(6)} for prof in self.professors
            }  # For wait time constraint

            # Extract schedule
            for i in range(0, len(solution), 5):
                course_idx = int(solution[i]) % len(curriculum_courses)
                course = curriculum_courses[course_idx]

                # Check if the course has already been assigned to this section
                if course in assigned_courses:
                    fitness -= 10  # Penalize duplicate course assignment
                    continue
                assigned_courses.add(course)

                professor = self.professors[int(solution[i + 1]) % len(self.professors)]
                room = self.rooms[int(solution[i + 2]) % len(self.rooms)]
                day_pair_idx = int(solution[i + 3]) % len(self.DAY_PAIRS)
                timeslot = int(solution[i + 4]) % self.TIME_SLOTS
                day_pair = self.DAY_PAIRS[day_pair_idx]
                lecture_day, lab_day = day_pair

                course_units = course.lecture_unit + course.lab_unit

                # Check if assigned time falls within constraint-defined hours
                lecture_start_time = self.times[timeslot]
                lecture_end_time = lecture_start_time + timedelta(
                    hours=course.lecture_unit
                )

                # Overlap check for the same section on the same day
                for scheduled_start, scheduled_end in section_day_times[lecture_day]:
                    if not (
                        lecture_end_time <= scheduled_start
                        or lecture_start_time >= scheduled_end
                    ):
                        fitness -= 15  # Penalize time overlaps
                        break
                else:
                    # No overlap, add this lecture time to section_day_times for further checks
                    section_day_times[lecture_day].append(
                        (lecture_start_time, lecture_end_time)
                    )
                    fitness += 5  # Reward for non-overlapping schedules

                # Check if assigned time falls within constraint-defined hours
                if (
                    lecture_start_time < self.start_time
                    or lecture_end_time > self.end_time
                ):
                    fitness -= 10
                    continue

                # Check department match
                if course.department != professor.department:
                    fitness -= 10
                    continue

                # Check daily units limit for lecture and lab days
                if daily_units[lecture_day] + course.lecture_unit > 6:
                    fitness -= 10  # Penalize exceeding lecture units per day
                    continue
                daily_units[lecture_day] += course.lecture_unit

                if course.lab_unit > 0:
                    if daily_units[lab_day] + course.lab_unit > 6:
                        fitness -= 10  # Penalize exceeding lab units per day
                        continue
                    daily_units[lab_day] += course.lab_unit

                # Wait time constraint: Enforce 30-minute gap between consecutive courses for a professor
                if self.constraints.wait_time:
                    previous_times = professor_daily_times[professor][lecture_day]
                    if previous_times:
                        last_end_time = previous_times[-1] + timedelta(minutes=30)
                        if lecture_start_time < last_end_time:
                            fitness -= 5  # Penalize lack of 30-minute gap
                        else:
                            fitness += 1  # Reward schedules with proper gap
                    professor_daily_times[professor][lecture_day].append(
                        lecture_end_time
                    )

                # Assign lecture to the first day in the pair, and lab (if applicable) to the second day
                if course.lab_unit > 0:
                    if (room, lecture_day, timeslot) in course_schedule or (
                        room,
                        lab_day,
                        timeslot,
                    ) in course_schedule:
                        fitness -= 5
                    else:
                        course_schedule[(room, lecture_day, timeslot)] = course
                        course_schedule[(room, lab_day, timeslot)] = course
                        fitness += 1

                    if (professor, lecture_day, timeslot) in course_schedule or (
                        professor,
                        lab_day,
                        timeslot,
                    ) in course_schedule:
                        fitness -= 5
                    else:
                        course_schedule[(professor, lecture_day, timeslot)] = course
                        course_schedule[(professor, lab_day, timeslot)] = course
                        fitness += 1
                else:
                    if (room, lecture_day, timeslot) in course_schedule:
                        fitness -= 5
                    else:
                        course_schedule[(room, lecture_day, timeslot)] = course
                        fitness += 1

                    if (professor, lecture_day, timeslot) in course_schedule:
                        fitness -= 5
                    else:
                        course_schedule[(professor, lecture_day, timeslot)] = course
                        fitness += 1

                # Professor qualification and unit checks
                if course.need_masteral and professor.has_masteral != "Y":
                    fitness -= 5
                else:
                    fitness += 1

                professor_units[professor] += course_units
                if professor_units[professor] > (professor.required_units or 0):
                    fitness -= 10
                else:
                    fitness += 1

                # Ensure the number of unique courses matches curriculum requirements
                if len(assigned_courses) != len(curriculum_courses):
                    fitness -= 20
                else:
                    print(
                        f"assign_courses:{len(assigned_courses)} curriculum_courses: {len(curriculum_courses)} "
                    )
                    print(" ")

            return fitness

        # Initialize PyGAD instance for the section
        ga_instance = pygad.GA(
            num_generations=self.num_generations,
            num_parents_mating=self.num_parents_mating,
            fitness_func=fitness_func,
            sol_per_pop=self.sol_per_pop,
            num_genes=len(curriculum_courses) * 5,
            gene_space=gene_space,
            parent_selection_type="sss",
            crossover_type="single_point",
            mutation_type="random",
            mutation_percent_genes=10,
        )

        # Run GA for the section
        ga_instance.run()
        solution, _, _ = ga_instance.best_solution()

        # Format the best solution for this section
        schedule = []
        assigned_courses = set()  # Track assigned courses in the final schedule
        for i in range(0, len(solution), 5):
            course = curriculum_courses[int(solution[i]) % len(curriculum_courses)]
            if course in assigned_courses:
                continue  # Skip duplicate courses in the final schedule
            assigned_courses.add(course)

            professor = self.professors[int(solution[i + 1]) % len(self.professors)]
            room = self.rooms[int(solution[i + 2]) % len(self.rooms)]
            day_pair = self.DAY_PAIRS[int(solution[i + 3]) % len(self.DAY_PAIRS)]
            timeslot = int(solution[i + 4]) % self.TIME_SLOTS

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
                    "professor_name": professor.first_name + professor.last_name,
                    "course_code": course.code,
                    "course_description": course.name,
                    "lecture_units": course.lecture_unit,
                    "lab_units": course.lab_unit,
                    "lecture_time_range": lecture_time_range,
                    "lab_time_range": lab_time_range,
                    "lecture_day_of_week": day_mapping[lecture_day],
                    "lab_day_of_week": day_mapping[lab_day],
                    "lecture_room_number": room.number,
                    "lab_room_number": lab_room.number,
                }
            else:
                course_entry = {
                    "professor_name": professor.first_name + professor.last_name,
                    "course_code": course.code,
                    "course_description": course.name,
                    "lecture_units": course.lecture_unit,
                    "lab_units": course.lab_unit,
                    "lecture_time_range": lecture_time_range,
                    "lab_time_range": "Time Not Assigned",
                    "lecture_day_of_week": day_mapping[lecture_day],
                    "lab_day_of_week": "Day Not Assigned",
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

    def run(self):
        all_schedules = {}  # Dictionary to accumulate schedules for all sections
        output = []

        for section in self.sections:
            # Filter curriculum based on year_level, program, and specified semester
            curriculum = Curriculum.objects.filter(
                year_level=section.year_level,
                program=section.program,
                semester=self.semester,
            ).first()

            if not curriculum:
                continue  # Skip if no matching curriculum is found

            curriculum_courses = list(curriculum.courses.all())
            # Generate the raw schedule for the section
            raw_schedule = self.generate_schedule_for_section(
                section, curriculum_courses
            )

            # Serialize the raw schedule for JSON storage
            serialized_schedule = self.serialize_schedule(
                raw_schedule, section, self.semester
            )
            all_schedules[section.id] = serialized_schedule

            # Format the schedule for output
            formatted_section_schedule = self.format_schedule_output(
                section, curriculum, raw_schedule
            )

            output.append(formatted_section_schedule)

        # Save all raw schedules to a single JSON file and cache the result
        self.save_all_schedules_to_json(all_schedules)

        return output
