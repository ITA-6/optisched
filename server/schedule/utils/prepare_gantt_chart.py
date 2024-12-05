from datetime import datetime, timedelta
import io
from matplotlib.figure import Figure
import base64


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
                        "id": f"course-{course_schedule.id}-lecture",
                        "rowId": f"room-{course_schedule.lecture_room.id}",
                        "label": f"{course_schedule.course.code} Lecture - {professor_name} - {section_label}",
                        "time": {
                            "start": lecture_start.timestamp() * 1000,  # Milliseconds
                            "end": lecture_end.timestamp() * 1000,  # Milliseconds
                        },
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
                        "id": f"course-{course_schedule.id}-lab",
                        "rowId": f"room-{course_schedule.lab_room.id}",
                        "label": f"{course_schedule.course.code} Lab - {professor_name} - {section_label}",
                        "time": {
                            "start": lab_start.timestamp() * 1000,  # Milliseconds
                            "end": lab_end.timestamp() * 1000,  # Milliseconds
                        },
                    }
                )

    gantt_chart = get_gantt(rows, items)

    return {
        "rows": rows,
        "items": items,
        "columns": time_slots,
        "gantt_chart": gantt_chart,
    }


def get_gantt(rows, items):
    # Create a mapping for room IDs to labels
    room_mapping = {room["id"]: room["label"] for room in rows}

    # Prepare data for the Gantt chart
    gantt_data = []
    for item in items:
        start_time = datetime.fromtimestamp(
            item["time"]["start"] / 1000
        )  # Convert milliseconds to seconds
        end_time = datetime.fromtimestamp(item["time"]["end"] / 1000)
        room_label = room_mapping.get(item["rowId"], "Unknown Room")
        gantt_data.append(
            {
                "room": room_label,
                "label": item["label"],
                "start_time": start_time,
                "end_time": end_time,
            }
        )

    # Sort the data by room and start time
    gantt_data.sort(key=lambda x: (x["room"], x["start_time"]))

    # Extract unique room labels and indices
    rooms = sorted(set(data["room"] for data in gantt_data))
    room_indices = {room: idx for idx, room in enumerate(rooms)}

    # Create a figure for the Gantt chart
    fig = Figure(figsize=(12, 8))
    ax = fig.subplots()

    for data in gantt_data:
        start = data["start_time"]
        end = data["end_time"]
        room_idx = room_indices[data["room"]]
        ax.barh(
            room_idx,
            (end - start).seconds / 3600,
            left=start.hour + start.minute / 60,
            label=data["label"],
            align="center",
            edgecolor="black",
        )

    # Set y-axis labels to room names
    ax.set_yticks(range(len(rooms)))
    ax.set_yticklabels(rooms)

    # Set labels and title
    ax.set_xlabel("Time")
    ax.set_ylabel("Rooms")
    ax.set_title("Schedule Gantt Chart")
    fig.tight_layout()

    # Save the Gantt chart to a BytesIO buffer
    buffer = io.BytesIO()
    fig.savefig(buffer, format="png")
    buffer.seek(0)

    # Encode the image as a base64 string
    encoded_image = base64.b64encode(buffer.getvalue()).decode("utf-8")
    buffer.close()

    # Return the base64 string
    return {"image": encoded_image}
