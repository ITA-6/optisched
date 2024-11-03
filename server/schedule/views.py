# schedule/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from schedule.models import Schedule
from schedule.serializers import SectionScheduleSerializer
from .management.commands.genetic_algorithm import GeneticAlgorithmRunner


# class ScheduleAPIView(APIView):
#     authentication_classes = []
#     permission_classes = [AllowAny]

#     def get(self, request, *args, **kwargs):
#         # Get query parameters
#         program_id = request.query_params.get("program_id")
#         year_level = request.query_params.get("year_level")
#         semester = request.query_params.get("semester")

#         # Filter schedules based on query parameters
#         schedules = Schedule.objects.filter(is_active=True)

#         if program_id:
#             schedules = schedules.filter(program_id=program_id)
#         if year_level:
#             schedules = schedules.filter(year_level=year_level)
#         if semester:
#             schedules = schedules.filter(semester=semester)

#         # Serialize the filtered schedules
#         serializer = ScheduleSerializer(schedules, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


class GenerateScheduleView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Run the genetic algorithm to generate the schedule
        runner = GeneticAlgorithmRunner()
        schedule_data = runner.run()  # Get the generated schedule data

        # Serialize the data
        serializer = SectionScheduleSerializer(schedule_data, many=True)
        return Response(serializer.data)
