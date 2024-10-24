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
        department_id = self.request.query_params.get("department_id")
        year_level = self.request.query_params.get("year_level")
        semester = self.request.query_params.get("semester")

        # Start by fetching all Curriculum objects and filtering by department
        queryset = Curriculum.objects.prefetch_related("courses").all()

        if department_id:
            queryset = queryset.filter(department_id=department_id)

        if year_level:
            queryset = queryset.filter(year_level=year_level)

        if semester:
            queryset = queryset.filter(semester=semester)

        # If no department was provided or found, return a 400 bad request
        if not queryset.exists():
            return Response(
                {"error": "No curriculum found for the specified department."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Serialize the filtered queryset
        serializer = CurriculumSerializer(queryset, many=True)

        # Return the serialized data in the response
        return Response(serializer.data, status=status.HTTP_200_OK)
