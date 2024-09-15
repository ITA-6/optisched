# schedule/management/commands/generate_schedule.py

from django.core.management.base import BaseCommand
import pygad
import numpy as np
from datetime import time, timedelta, datetime, date

from course.models import Course
from professor.models import Professor
from room.models import Room
from section.models import Section


def generate_schedule():
    # Fetch data from Django models
    courses = list(Course.objects.filter(is_active=True))
    professors = list(Professor.objects.filter(is_active=True))
    rooms = list(Room.objects.filter(is_active=True))
    sections = list(Section.objects.filter(is_active=True))

    # Ensure each course has at least one section associated
    for course in courses:
        if course.sections.count() == 0:
            section_label = f"{course.name[:3]}-Def"
            section = Section.objects.create(label=section_label, year_level=1)
            course.sections.add(section)
            course.save()

    # Map professors to courses based on their department
    course_professor_map = {
        course.id: [
            prof.id for prof in professors if prof.department_id == course.department_id
        ]
        for course in courses
    }

    # Define the employment constraints
    employment_constraints = {
        "PERMANENT": 21,
        "TEMPORARY": 24,
        "PART_TIME": 12,
    }

    # Define available time slots from 7 AM to 9 PM, with a maximum of 6 hours of teaching per day
    timeslots_per_day = [
        time(hour, minute) for hour in range(7, 21) for minute in [0, 30]
    ]
    total_timeslots = len(timeslots_per_day) * 6  # 6 days a week

    def fitness_func(ga_instance, solution, solution_idx):
        fitness = 0
        num_courses = len(solution) // 3
        prof_units = {prof.id: 0 for prof in professors}  # Track units per professor
        prof_hours_per_day = {
            prof.id: {day: 0 for day in range(6)} for prof in professors
        }

        for i in range(num_courses):
            prof_idx, room_idx, timeslot_idx = solution[i * 3 : i * 3 + 3]

            # Convert indices to integers
            prof_idx = int(prof_idx)
            room_idx = int(room_idx)
            timeslot_idx = int(timeslot_idx)

            course = courses[i]
            professor = professors[prof_idx]
            room = rooms[room_idx]
            day_of_week = timeslot_idx // len(
                timeslots_per_day
            )  # Calculate day of the week
            start_time = timeslots_per_day[timeslot_idx % len(timeslots_per_day)]
            end_time = (
                datetime.combine(date.min, start_time) + timedelta(hours=1)
            ).time()

            # Calculate course units and add to professor's load
            course_units = course.total_units
            prof_units[professor.id] += course_units

            # Check if professor exceeds their maximum units
            max_units = employment_constraints.get(
                professor.employment_status.upper(), 0
            )
            if prof_units[professor.id] > max_units:
                fitness -= 50  # Penalize if professor exceeds their max units

            # Check if professor exceeds 6 hours per day
            prof_hours_per_day[professor.id][day_of_week] += 1
            if prof_hours_per_day[professor.id][day_of_week] > 6:
                fitness -= 50  # Penalize if professor exceeds 6 hours in a day

            # Check if professor teaches two courses simultaneously
            for j in range(i + 1, num_courses):
                other_prof_idx, other_room_idx, other_timeslot_idx = solution[
                    j * 3 : j * 3 + 3
                ]
                other_prof_idx = int(other_prof_idx)
                other_timeslot_idx = int(other_timeslot_idx)
                other_day_of_week = other_timeslot_idx // len(timeslots_per_day)

                if (
                    prof_idx == other_prof_idx
                    and day_of_week == other_day_of_week
                    and timeslot_idx == other_timeslot_idx
                ):
                    fitness -= (
                        100  # Heavy penalty for teaching two courses simultaneously
                    )

            # Enforce the 30-60 minute break after each class
            if i > 0:
                prev_timeslot_idx = solution[(i - 1) * 3 + 2]
                if prev_timeslot_idx == timeslot_idx - 1:  # No break
                    fitness -= 30
                elif prev_timeslot_idx == timeslot_idx - 2:  # 30-minute break
                    fitness -= 10  # Minor penalty
                elif prev_timeslot_idx < timeslot_idx - 2:  # 60-minute or more break
                    fitness += 10  # Reward

        return fitness

    gene_space = [
        list(range(len(professors))),  # Professors
        list(range(len(rooms))),  # Rooms
        list(range(total_timeslots)),  # Timeslots across the week
    ] * len(courses)

    ga_instance = pygad.GA(
        num_generations=200,
        num_parents_mating=5,
        fitness_func=fitness_func,
        sol_per_pop=50,
        num_genes=3 * len(courses),  # 3 genes per course (professor, room, timeslot)
        gene_space=gene_space,
        parent_selection_type="rank",
        crossover_type="single_point",
        mutation_type="random",
        mutation_percent_genes=10,
    )

    ga_instance.run()

    solution, solution_fitness, solution_idx = ga_instance.best_solution()

    # Collect the schedules in memory
    schedules = []
    for i in range(len(courses)):
        prof_idx, room_idx, timeslot_idx = solution[i * 3 : i * 3 + 3]

        prof_idx = int(prof_idx)
        room_idx = int(room_idx)
        timeslot_idx = int(timeslot_idx)

        course = courses[i]
        professor = professors[prof_idx]
        room = rooms[room_idx]
        day_of_week = timeslot_idx // len(timeslots_per_day)
        start_time = timeslots_per_day[timeslot_idx % len(timeslots_per_day)]
        end_time = (datetime.combine(date.min, start_time) + timedelta(hours=1)).time()

        for section in course.sections.all():
            schedules.append(
                {
                    "course": course,
                    "professor": professor,
                    "room": room,
                    "section": section,
                    "day_of_week": day_of_week,
                    "start_time": start_time,
                    "end_time": end_time,
                }
            )

    return schedules


class Command(BaseCommand):
    help = "Generate the schedule using a genetic algorithm."

    def handle(self, *args, **kwargs):
        schedules = generate_schedule()
        self.stdout.write(schedules)  # This is for debugging purposes
