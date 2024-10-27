# schedule/views.py

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from schedule.models import Schedule
from schedule.serializers import ScheduleSerializer
from rest_framework.permissions import AllowAny


class SectionScheduleView(generics.ListAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Fetch the section ID from the URL parameters
        section_id = self.kwargs.get("section_id")
        return Schedule.objects.filter(section_id=section_id, is_active=True)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {"message": "No schedules found for this section."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
