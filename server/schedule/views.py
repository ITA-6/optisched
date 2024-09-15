from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .management.commands.generate_schedule import generate_schedule


from .serializers import ScheduleSerializer
from schedule.models import Schedule


class GenerateScheduleView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        schedules = generate_schedule()  # Directly call the function
        # Serialize the generated schedule
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data)


class ScheduleView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        schedules = Schedule.objects.all()  # Directly call the function
        # Serialize the generated schedule
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data)


class ConfirmScheduleView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ScheduleSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"status": "Schedule confirmed and saved!"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
