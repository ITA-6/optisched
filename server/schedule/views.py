# schedule/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from schedule.models import Schedule, CourseSchedule, TimeSlot
from schedule.serializers import SectionScheduleSerializer, ScheduleSerializer
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

    def put(self, request, section_id):
        """
        Updates an existing schedule based on section_id. Supports partial updates.
        """
        schedule = get_object_or_404(Schedule, section_id=section_id, is_active=True)
        serializer = ScheduleSerializer(schedule, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, section_id):
        """
        Soft deletes a schedule, setting it as inactive.
        """
        schedule = get_object_or_404(Schedule, section_id=section_id)
        schedule.soft_delete()  # Calls the model's soft_delete method to mark inactive
        return Response(
            {"message": "Schedule archived successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )

    def post(self, request):
        """
        Creates a new schedule. This is triggered after generating and confirming the schedule.
        """
        serializer = ScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
