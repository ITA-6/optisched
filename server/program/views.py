from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from program.models import Program
from program.serializers import ProgramSerializer


class ProgramAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk:
            try:
                program = Program.objects.get(pk=pk)
                serializer = ProgramSerializer(program)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Program.DoesNotExist:
                return Response(
                    {"error": "Program not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            programs = Program.objects.all()
            serializer = ProgramSerializer(programs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = ProgramSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = {"message": "Program has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)
    
    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        # Retrieve the existing instance of Building
        try:
            course = Program.objects.get(pk=pk)
        except Program.DoesNotExist:
            return Response(
                {"message": "Program not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Pass the instance to the serializer along with the new data
        serializer = ProgramSerializer(course, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = {"message": "Program has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            instance = Program.objects.get(pk=pk)
            instance.delete()
            return Response(
                {"message": "Program has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Program.DoesNotExist:
            return Response(
                {"error": "Program not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
