from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from program.models import Program
from program.serializers import ProgramSerializer


class ProgramAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        user = request.user
        user_privilege = user.get_privilege()

        if pk:
            # Handle single program retrieval
            try:
                program = Program.objects.get(pk=pk)

                # Check access permissions for sub_admin
                if (
                    user_privilege == "sub_admin"
                    and program.department != user.department
                ):
                    return Response(
                        {"error": "You do not have permission to access this program."},
                        status=status.HTTP_403_FORBIDDEN,
                    )

                serializer = ProgramSerializer(program)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Program.DoesNotExist:
                return Response(
                    {"error": "Program not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            # Handle all programs retrieval
            if user_privilege == "admin":
                programs = Program.objects.all()
            elif user_privilege == "sub_admin":
                programs = Program.objects.filter(department=user.department)
            else:
                return Response(
                    {"error": "You do not have permission to view programs."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            serializer = ProgramSerializer(programs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # Ensure department exists
        department = request.user.department.id
        if not self.is_valid_department(department):
            return Response(
                {"error": "Department not found"}, status=status.HTTP_404_NOT_FOUND
            )

        request.data["department"] = department
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
