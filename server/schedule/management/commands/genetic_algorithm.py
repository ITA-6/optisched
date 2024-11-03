# schedule/management/commands/genetic_algorithm.py
import pygad
from room.models import Room
from professor.models import Professor
from curriculum.models import Curriculum
from section.models import Section


class GeneticAlgorithmRunner:
    def __init__(self, semester="FIRST_SEMESTER"):
        # Load data from models
        self.rooms = list(Room.objects.filter(is_active=True))
        self.professors = list(Professor.objects.filter(is_active=True))
        self.sections = list(Section.objects.filter(is_active=True))

        # Semester filter
        self.semester = semester

        # Constants
        self.TIME_SLOTS = (
            28  # 7:00 AM to 9:00 PM with 30-minute intervals (14 hours * 2)
        )
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

                course_units = course.lecture_unit + course.lab_unit
                professor_units[professor] += course_units
                if professor_units[professor] > (professor.required_units or 0):
                    fitness -= 10
                else:
                    fitness += 1

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

    def format_time_range(self, start_hour, start_minute, duration_hours):
        # Calculate end hour and minute based on duration
        end_hour = (start_hour + duration_hours) % 24
        end_minute = start_minute

        def to_am_pm(hour, minute):
            period = "AM" if hour < 12 else "PM"
            hour = hour % 12 if hour % 12 != 0 else 12
            return f"{hour}:{minute:02} {period}"

        start_time = to_am_pm(start_hour, start_minute)
        end_time = to_am_pm(end_hour, end_minute)
        return f"{start_time} - {end_time}"

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

            lecture_start_hour = 7 + (timeslot // 2)
            lecture_start_minute = 30 if timeslot % 2 else 0
            lecture_time_range = self.format_time_range(
                lecture_start_hour, lecture_start_minute, course.lecture_hours
            )

            if course.lab_unit > 0:
                lab_timeslot = (timeslot + course.lecture_hours * 2) % self.TIME_SLOTS
                lab_room = self.rooms[(self.rooms.index(room) + 1) % len(self.rooms)]
                lab_start_hour = 7 + (lab_timeslot // 2)
                lab_start_minute = 30 if lab_timeslot % 2 else 0
                lab_time_range = self.format_time_range(
                    lab_start_hour, lab_start_minute, course.lab_hours
                )

                course_entry = {
                    "professor_name": professor.first_name,
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
                    "professor_name": professor.first_name,
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

    def run(self):
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
            schedule = self.generate_schedule_for_section(section, curriculum_courses)
            formatted_section_schedule = self.format_schedule_output(
                section, curriculum, schedule
            )
            output.append(formatted_section_schedule)

        return output
