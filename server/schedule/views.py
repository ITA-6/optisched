# schedule/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from professor.models import Professor
from schedule.models import Schedule, CourseSchedule, TimeSlot
from schedule.serializers import (
    SectionScheduleSerializer,
    ScheduleSerializer,
)
from section.models import Section
from .management.commands.genetic_algorithm import GeneticAlgorithmRunner
from django.core.cache import cache


class ScheduleView(APIView):
    """
    Manages the creation, viewing, updating, and archiving (soft delete) of schedules.
    """

    def get(self, request, section_id=None):
        """
        Retrieves either all schedules or a specific schedule if a section_id is provided.
        """
        if section_id:
            # Retrieve a specific schedule by section_id
            schedule = get_object_or_404(
                Schedule, section_id=section_id, is_active=True
            )
            serializer = ScheduleSerializer(schedule)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Retrieve all active schedules
        schedules = Schedule.objects.filter(is_active=True)
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfessorScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            professor = request.user.professor

            # Retrieve all schedules associated with the given professor and prefetch related courses
            schedules = (
                Schedule.objects.filter(courses__professor=professor)
                .distinct()
                .prefetch_related(
                    "courses__course",
                    "courses__professor",
                    "courses__lecture_time_range",
                    "courses__lab_time_range",
                    "courses__lecture_room",
                    "courses__lab_room",
                )
            )

            if not schedules.exists():
                return Response(
                    {"error": "No schedule found for this professor."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Manually build the response structure
            transformed_data = []
            for schedule in schedules:
                section_label = schedule.section.label if schedule.section else None
                year_level = schedule.section.year_level if schedule.section else None
                total_units = sum(
                    course.course.lecture_unit + course.course.lab_unit
                    for course in schedule.courses.filter(professor=professor)
                )

                # Build course data in the desired format
                courses = []
                for course_schedule in schedule.courses.filter(professor=professor):
                    course_data = {
                        "course": {
                            "code": course_schedule.course.code,
                            "description": course_schedule.course.name,
                            "lecture_units": course_schedule.course.lecture_unit,
                            "lab_units": course_schedule.course.lab_unit,
                        },
                        "lecture_time_range": {
                            "day_of_week": course_schedule.lecture_time_range.get_day_of_week_display(),
                            "start_time": course_schedule.lecture_time_range.start_time.strftime(
                                "%I:%M %p"
                            ),
                            "end_time": course_schedule.lecture_time_range.end_time.strftime(
                                "%I:%M %p"
                            ),
                        }
                        if course_schedule.lecture_time_range
                        else None,
                        "lab_time_range": {
                            "day_of_week": course_schedule.lab_time_range.get_day_of_week_display(),
                            "start_time": course_schedule.lab_time_range.start_time.strftime(
                                "%I:%M %p"
                            ),
                            "end_time": course_schedule.lab_time_range.end_time.strftime(
                                "%I:%M %p"
                            ),
                        }
                        if course_schedule.lab_time_range
                        else None,
                        "lecture_room": {"number": course_schedule.lecture_room.number}
                        if course_schedule.lecture_room
                        else None,
                        "lab_room": {"number": course_schedule.lab_room.number}
                        if course_schedule.lab_room
                        else None,
                    }
                    courses.append(course_data)

                # Append each schedule with the structured format
                transformed_data.append(
                    {
                        "professor": {
                            "first_name": professor.first_name,
                            "last_name": professor.last_name,
                            "department_name": professor.department.name,
                        },
                        "section_label": f"{year_level}{section_label}",
                        "courses": courses,
                        "total_units": total_units,
                    }
                )

            return Response(transformed_data, status=status.HTTP_200_OK)

        except Professor.DoesNotExist:
            return Response(
                {"error": "Professor not found"}, status=status.HTTP_404_NOT_FOUND
            )


class GenerateScheduleView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Run the genetic algorithm to generate the schedule
        runner = GeneticAlgorithmRunner()
        schedule_data = runner.run()  # Get the generated schedule data

        # Serialize the data for display on the client side
        serializer = SectionScheduleSerializer(schedule_data, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Retrieve all cached schedules
        cached_schedules = cache.get("all_generated_schedules")

        if not cached_schedules:
            return Response(
                {"detail": "No generated schedules found in cache."},
                status=status.HTTP_404_NOT_FOUND,
            )

        Schedule.objects.all().delete()

        # Iterate over each section's schedule and save it to the database
        for section_id, cached_schedule in cached_schedules.items():
            # Get or create the main Schedule entry
            section = Section.objects.get(id=section_id)
            schedule, created = Schedule.objects.get_or_create(
                section=section,
                year_level=cached_schedule["year_level"],
                semester=cached_schedule["semester"],
                program_id=cached_schedule["program_id"],
                department_id=cached_schedule["department_id"],
                defaults={"is_active": True},
            )

            # Iterate over each course in the cached schedule and create CourseSchedule entries
            for course_data in cached_schedule["courses"]:
                # Create or get the lecture time slot
                lecture_time_slot = None
                if course_data["lecture_time_range"]:
                    lecture_time_slot, _ = TimeSlot.objects.get_or_create(
                        day_of_week=course_data["lecture_time_range"]["day_of_week"],
                        start_time=course_data["lecture_time_range"]["start_time"],
                        end_time=course_data["lecture_time_range"]["end_time"],
                    )

                # Create or get the lab time slot
                lab_time_slot = None
                if course_data["lab_time_range"]:
                    lab_time_slot, _ = TimeSlot.objects.get_or_create(
                        day_of_week=course_data["lab_time_range"]["day_of_week"],
                        start_time=course_data["lab_time_range"]["start_time"],
                        end_time=course_data["lab_time_range"]["end_time"],
                    )

                # Create the CourseSchedule entry and add it to the main Schedule
                course_schedule = CourseSchedule.objects.create(
                    course_id=course_data["course_id"],
                    professor_id=course_data["professor_id"],
                    lecture_room_id=course_data["lecture_room_id"],
                    lab_room_id=course_data["lab_room_id"],
                    lecture_time_range=lecture_time_slot,
                    lab_time_range=lab_time_slot,
                )
                # Associate the course schedule with the main schedule
                schedule.courses.add(course_schedule)

        # Clear the cache after successfully saving all schedules
        cache.delete("all_generated_schedules")

        return Response(
            {"detail": "All cached schedules successfully saved to the database."},
            status=status.HTTP_201_CREATED,
        )
