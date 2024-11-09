from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from curriculum.models import Curriculum
from curriculum.serializers import CurriculumSerializer, CreateCurriculumSerializer


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

    def post(self, request, *args, **kwargs):
        serializer = CreateCurriculumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        curriculum_id = kwargs.get("id")
        try:
            curriculum = Curriculum.objects.get(id=curriculum_id)
        except Curriculum.DoesNotExist:
            return Response(
                {"error": "Curriculum not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = CreateCurriculumSerializer(
            curriculum, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        curriculum_id = kwargs.get("id")
        try:
            curriculum = Curriculum.objects.get(id=curriculum_id)
        except Curriculum.DoesNotExist:
            return Response(
                {"error": "Curriculum not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        curriculum.delete()
        return Response(
            {"message": "Curriculum deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )
