from datetime import datetime, timedelta

from room.models import Room
from constraint.models import Constraint
from schedule.models import Schedule


def prepare_gantt_data():
    """
    Prepare data for Gantt chart representation of the schedule.
    Returns rows, items, and columns.
    """
    rows = []
    items = []

    # Fetch active schedules and constraints
    schedules = (
        Schedule.objects.filter(is_active=True)
        .select_related("section", "program", "department")
        .prefetch_related(
            "courses__lecture_time_range",
            "courses__lab_time_range",
            "courses__lecture_room",
            "courses__lab_room",
        )
    )
    constraint = Constraint.objects.first()
    start_time = (
        constraint.start_time
        if constraint
        else datetime.strptime("08:00", "%H:%M").time()
    )
    end_time = (
        constraint.end_time
        if constraint
        else datetime.strptime("18:00", "%H:%M").time()
    )

    DAYS_OF_WEEK = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]

    # Generate 30-minute time frame columns
    time_slots = []
    current_time = datetime.combine(datetime.today(), start_time)
    end_datetime = datetime.combine(datetime.today(), end_time)

    while current_time < end_datetime:
        next_time = current_time + timedelta(minutes=30)
        time_slots.append(
            {
                "id": f"time-{current_time.strftime('%H:%M')}",
                "label": current_time.strftime("%H:%M"),
                "start": current_time.timestamp() * 1000,  # Milliseconds
                "end": next_time.timestamp() * 1000,  # Milliseconds
            }
        )
        current_time = next_time

    # Fetch all active rooms
    rooms = Room.objects.filter(is_active=True)

    # Add rows for each room
    for room in rooms:
        rows.append(
            {
                "id": f"room-{room.id}",
                "roomId": room.id,
                "label": f"{room.building.name} Room {room.number}",
            }
        )

    # Add items for each course schedule
    for schedule in schedules:
        for course_schedule in schedule.courses.all():
            professor_name = (
                f"{course_schedule.professor.first_name} {course_schedule.professor.last_name}"
                if course_schedule.professor
                else "TBA"
            )
            section_label = f"{schedule.section}"

            # Handle lecture times
            if course_schedule.lecture_time_range and course_schedule.lecture_room:
                lecture_start = datetime.combine(
                    datetime.today(), course_schedule.lecture_time_range.start_time
                )
                lecture_end = datetime.combine(
                    datetime.today(), course_schedule.lecture_time_range.end_time
                )
                items.append(
                    {
                        "id": f"{course_schedule.id}",
                        "rowId": f"room-{course_schedule.lecture_room.id}",
                        "roomId": course_schedule.lecture_room.id,
                        "room": f"{course_schedule.lecture_room.number} - {course_schedule.lecture_room.building.name}",
                        "label": f"{course_schedule.course.code} Lecture - {professor_name} - {section_label}",
                        "type": "Lecture",
                        "time": {
                            "start": lecture_start.timestamp() * 1000,  # Milliseconds
                            "end": lecture_end.timestamp() * 1000,  # Milliseconds
                        },
                        "day": DAYS_OF_WEEK[
                            course_schedule.lecture_time_range.day_of_week
                        ],
                    }
                )

            # Handle lab times
            if course_schedule.lab_time_range and course_schedule.lab_room:
                lab_start = datetime.combine(
                    datetime.today(), course_schedule.lab_time_range.start_time
                )
                lab_end = datetime.combine(
                    datetime.today(), course_schedule.lab_time_range.end_time
                )
                items.append(
                    {
                        "id": f"{course_schedule.id}",
                        "rowId": f"room-{course_schedule.lab_room.id}",
                        "roomId": course_schedule.lab_room.id,
                        "room": f"{course_schedule.lab_room.number} - {course_schedule.lab_room.building.name}",
                        "label": f"{course_schedule.course.code} Lab - {professor_name} - {section_label}",
                        "type": "Laboratory",
                        "time": {
                            "start": lab_start.timestamp() * 1000,  # Milliseconds
                            "end": lab_end.timestamp() * 1000,  # Milliseconds
                        },
                        "day": DAYS_OF_WEEK[course_schedule.lab_time_range.day_of_week],
                    }
                )

    return {
        "rows": rows,
        "items": items,
        "columns": time_slots,
    }
