from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from professor.models import Professor
from professor.serializers import ProfessorSerializer


class ProfessorAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk:
            try:
                professor = Professor.objects.get(pk=pk)
                serializer = ProfessorSerializer(professor)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Professor.DoesNotExist:
                return Response(
                    {"error": "Department not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            professors = Professor.objects.all()
            serializer = ProfessorSerializer(professors, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = ProfessorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {"message": "Professor has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            instance = Professor.objects.get(pk=pk)
            instance.delete()
            return Response(
                {"message": "Professor has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Professor.DoesNotExist:
            return Response(
                {"error": "Professor not found"}, status=status.HTTP_404_NOT_FOUND
            )
