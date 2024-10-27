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
    # Step 1: Fetch and Initialize Data
    courses = list(Course.objects.filter(is_active=True))
    professors = list(Professor.objects.filter(is_active=True))
    rooms = list(Room.objects.filter(is_active=True))
    sections = list(Section.objects.filter(is_active=True))

    # Step 2: Ensure each course has at least one section associated
    ensure_course_sections(courses)

    # Step 3: Generate Professor-Course Map and Set Constraints
    course_professor_map = map_professors_to_courses(courses, professors)
    employment_constraints = {"PERMANENT": 21, "TEMPORARY": 24, "PART_TIME": 12}
    timeslots_per_day, total_timeslots = generate_timeslots()

    # Step 4: Set Up and Run Genetic Algorithm
    gene_space = create_gene_space(
        len(professors), len(rooms), total_timeslots, len(courses)
    )
    solution = run_genetic_algorithm(
        courses,
        professors,
        rooms,
        employment_constraints,
        timeslots_per_day,
        gene_space,
    )

    # Step 5: Collect and Format the Optimized Schedule
    schedules = collect_schedules(
        solution, courses, professors, rooms, timeslots_per_day
    )

    return schedules


def ensure_course_sections(courses):
    """Ensures each course has at least one section."""
    for course in courses:
        if course.sections.count() == 0:
            section_label = f"{course.name[:3]}-Def"
            section = Section.objects.create(label=section_label, year_level=1)
            course.sections.add(section)
            course.save()


def map_professors_to_courses(courses, professors):
    """Map professors to courses based on their department association."""
    return {
        course.id: [
            prof.id for prof in professors if prof.department_id == course.department_id
        ]
        for course in courses
    }


def generate_timeslots():
    """Generate available timeslots from 7 AM to 9 PM across 6 days."""
    timeslots_per_day = [
        time(hour, minute) for hour in range(7, 21) for minute in [0, 30]
    ]
    total_timeslots = len(timeslots_per_day) * 6  # 6 days a week
    return timeslots_per_day, total_timeslots


def create_gene_space(num_professors, num_rooms, total_timeslots, num_courses):
    """Create gene space for each course."""
    return [
        list(range(num_professors)),  # Professors
        list(range(num_rooms)),  # Rooms
        list(range(total_timeslots)),  # Timeslots across the week
    ] * num_courses


def fitness_function(
    ga_instance,
    solution,
    solution_idx,
    courses,
    professors,
    rooms,
    employment_constraints,
    timeslots_per_day,
):
    """Calculate the fitness score for a schedule solution."""
    fitness = 0
    num_courses = len(solution) // 3
    prof_units = {prof.id: 0 for prof in professors}  # Track units per professor
    prof_hours_per_day = {prof.id: {day: 0 for day in range(6)} for prof in professors}

    for i in range(num_courses):
        prof_idx, room_idx, timeslot_idx = map(int, solution[i * 3 : i * 3 + 3])
        course = courses[i]
        professor = professors[prof_idx]
        room = rooms[room_idx]
        day_of_week = timeslot_idx // len(timeslots_per_day)
        start_time = timeslots_per_day[timeslot_idx % len(timeslots_per_day)]
        end_time = (datetime.combine(date.min, start_time) + timedelta(hours=1)).time()

        # Calculate course units and add to professor's load
        course_units = course.total_units
        prof_units[professor.id] += course_units

        # Check professor's maximum unit load and daily teaching hours
        max_units = employment_constraints.get(professor.employment_status.upper(), 0)
        fitness -= 50 if prof_units[professor.id] > max_units else 0
        prof_hours_per_day[professor.id][day_of_week] += 1
        fitness -= 50 if prof_hours_per_day[professor.id][day_of_week] > 6 else 0

        # Penalize simultaneous courses and enforce breaks
        fitness -= check_simultaneous_courses(
            solution,
            prof_idx,
            day_of_week,
            timeslot_idx,
            i,
            num_courses,
            timeslots_per_day,
        )
        fitness += enforce_breaks(solution, i, timeslot_idx)

    return fitness


def check_simultaneous_courses(
    solution,
    prof_idx,
    day_of_week,
    timeslot_idx,
    current_idx,
    num_courses,
    timeslots_per_day,
):
    """Apply penalty for scheduling two simultaneous courses for the same professor."""
    penalty = 0
    for j in range(current_idx + 1, num_courses):
        other_prof_idx, _, other_timeslot_idx = map(int, solution[j * 3 : j * 3 + 3])
        other_day_of_week = other_timeslot_idx // len(timeslots_per_day)

        if (
            prof_idx == other_prof_idx
            and day_of_week == other_day_of_week
            and timeslot_idx == other_timeslot_idx
        ):
            penalty -= 100  # Heavy penalty for simultaneous courses
    return penalty


def enforce_breaks(solution, current_idx, timeslot_idx):
    """Enforce a 30-60 minute break after each class."""
    if current_idx > 0:
        prev_timeslot_idx = int(solution[(current_idx - 1) * 3 + 2])
        if prev_timeslot_idx == timeslot_idx - 1:  # No break
            return -30
        elif prev_timeslot_idx == timeslot_idx - 2:  # 30-minute break
            return -10  # Minor penalty
        elif prev_timeslot_idx < timeslot_idx - 2:  # 60-minute or more break
            return 10  # Reward
    return 0


def run_genetic_algorithm(
    courses, professors, rooms, employment_constraints, timeslots_per_day, gene_space
):
    """Set up and run the genetic algorithm for schedule optimization."""
    ga_instance = pygad.GA(
        num_generations=200,
        num_parents_mating=5,
        fitness_func=lambda ga, sol, idx: fitness_function(
            ga,
            sol,
            idx,
            courses,
            professors,
            rooms,
            employment_constraints,
            timeslots_per_day,
        ),
        sol_per_pop=50,
        num_genes=3 * len(courses),
        gene_space=gene_space,
        parent_selection_type="rank",
        crossover_type="single_point",
        mutation_type="random",
        mutation_percent_genes=10,
    )

    ga_instance.run()
    solution, _, _ = ga_instance.best_solution()
    return solution


def collect_schedules(solution, courses, professors, rooms, timeslots_per_day):
    """Collect and format the schedule from the GA solution."""
    schedules = []
    for i in range(len(courses)):
        prof_idx, room_idx, timeslot_idx = map(int, solution[i * 3 : i * 3 + 3])
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
