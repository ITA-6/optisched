from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from curriculum.models import Curriculum
from curriculum.serializers import CurriculumSerializer


class CurriculumAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        # Get query parameters
        program_id = self.request.query_params.get("program_id")
        year_level = self.request.query_params.get("year_level")
        semester = self.request.query_params.get("semester")

        # Start by fetching all Curriculum objects and filtering by program
        queryset = Curriculum.objects.prefetch_related("courses").all()

        if program_id:
            queryset = queryset.filter(program=program_id)

        if year_level:
            queryset = queryset.filter(year_level=year_level)

        if semester:
            queryset = queryset.filter(semester=semester)

        # If no program was provided or found, return a 400 bad request
        if not queryset.exists():
            return Response(
                {"error": "No curriculum found for the specified program."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Serialize the filtered queryset
        serializer = CurriculumSerializer(queryset, many=True)

        # Return the serialized data in the response
        return Response(serializer.data, status=status.HTTP_200_OK)
