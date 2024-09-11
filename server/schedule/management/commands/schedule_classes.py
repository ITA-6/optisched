from django.core.management.base import BaseCommand

import pygad
import numpy as np

from course.models import Course
from professor.models import Professor
from room.models import Room
from section.models import Section
from schedule.models import Schedule


class Command(BaseCommand):
    help = "Run the genetic algorithm to schedule classes."

    def handle(self, *args, **kwargs):
        # Fetch data from Django models
        courses = list(Course.objects.filter(is_active=True))
        professors = list(Professor.objects.filter(is_active=True))
        rooms = list(Room.objects.filter(is_active=True))
        sections = list(Section.objects.filter(is_active=True))

        # Mapping Course to valid Professors and Rooms
        course_professor_map = {
            course.id: [
                prof.id for prof in professors if prof.department == course.department
            ]
            for course in courses
        }
        course_room_map = {course.id: [room.id for room in rooms] for course in courses}
        professor_timeslot_map = {
            prof.id: list(range(20))
            for prof in professors  # Assuming 20 timeslots
        }

        # Constants for the problem based on the fetched data
        NUM_COURSES = len(courses)
        NUM_PROFESSORS = len(professors)
        NUM_ROOMS = len(rooms)
        NUM_TIMESLOTS = 20  # This could be defined by the available hours per week, e.g., 8 AM - 5 PM

        def index_to_course(idx):
            return courses[idx]

        def index_to_professor(idx):
            return professors[idx]

        def index_to_room(idx):
            return rooms[idx]

        # Fitness function
        def fitness_func(solution, solution_idx):
            fitness = 0

            for i in range(NUM_COURSES):
                course = index_to_course(i)
                prof_idx, room_idx, timeslot = solution[i * 3 : i * 3 + 3]
                professor = index_to_professor(prof_idx)
                room = index_to_room(room_idx)

                # Check if the professor is allowed to teach the course
                if professor.id not in course_professor_map[course.id]:
                    fitness -= 20  # Penalize heavily if the professor isn't allowed to teach the course

                # Check if the room is valid for the course
                if room.id not in course_room_map[course.id]:
                    fitness -= (
                        20  # Penalize heavily if the room isn't valid for the course
                    )

                # Check for time conflicts
                for j in range(i + 1, NUM_COURSES):
                    other_prof_idx, other_room_idx, other_timeslot = solution[
                        j * 3 : j * 3 + 3
                    ]
                    if timeslot == other_timeslot:
                        if room_idx == other_room_idx:
                            fitness -= 10  # Penalize room conflicts
                        if prof_idx == other_prof_idx:
                            fitness -= 10  # Penalize professor conflicts

            return fitness

        # Gene space: Professor, Room, Timeslot for each course
        gene_space = [
            list(range(NUM_PROFESSORS)),  # Professors
            list(range(NUM_ROOMS)),  # Rooms
            list(range(NUM_TIMESLOTS)),  # Timeslots
        ] * NUM_COURSES

        # Initialize GA
        ga_instance = pygad.GA(
            num_generations=200,
            num_parents_mating=5,
            fitness_func=fitness_func,
            sol_per_pop=50,
            num_genes=3 * NUM_COURSES,  # 3 genes per course (professor, room, timeslot)
            gene_space=gene_space,
            parent_selection_type="rank",
            crossover_type="single_point",
            mutation_type="random",
            mutation_percent_genes=10,
        )

        # Run the GA
        ga_instance.run()

        # Get the best solution
        solution, solution_fitness, solution_idx = ga_instance.best_solution()
        self.stdout.write(f"Best Solution: {solution}")
        self.stdout.write(f"Fitness: {solution_fitness}")

        # Parse the solution back into schedules
        schedules = []
        for i in range(NUM_COURSES):
            course = index_to_course(i)
            prof_idx, room_idx, timeslot = solution[i * 3 : i * 3 + 3]
            professor = index_to_professor(prof_idx)
            room = index_to_room(room_idx)

            # Here, convert the timeslot index to actual time (this part is simplified)
            day_of_week = timeslot // (NUM_TIMESLOTS // 5)  # Assume 5 days a week
            start_time = (
                timeslot % (NUM_TIMESLOTS // 5) + 8
            )  # Assume timeslots start at 8 AM
            end_time = start_time + 1  # Simplification: 1-hour slots

            # Save the schedule to the database
            schedule = Schedule(
                course=course,
                professor=professor,
                room=room,
                section=course.section,  # Assuming course has a foreign key to section
                day_of_week=day_of_week,
                start_time=f"{start_time}:00",
                end_time=f"{end_time}:00",
            )
            schedule.save()
            schedules.append(schedule)

        self.stdout.write("Schedules created successfully!")
