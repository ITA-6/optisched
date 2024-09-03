from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView


from department.models import Department
from department.serializers import DepartmentSerializer


class DepartmentAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk:
            try:
                department = Department.objects.get(pk=pk)
                serializer = DepartmentSerializer(department)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Department.DoesNotExist:
                return Response(
                    {"error": "Department not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            departments = Department.objects.all()
            serializer = DepartmentSerializer(departments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = DepartmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        department = serializer.save()
        data = {
            "message": "Department has been created.",
            "data": {
                "department_name": department.name,
                "department_acronym": department.acronym,
            },
        }
        return Response(data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            instance = Department.objects.get(pk=pk)
            instance.delete()
            return Response(
                {"message": "Department has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Department.DoesNotExist:
            return Response(
                {"error": "Department not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
