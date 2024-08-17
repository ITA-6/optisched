from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from .serializers import DepartmentSerializer
from .permissions import IsAdminOrReadOnly
from department.models import Department


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.filter(is_active=True)
    serializer_class = DepartmentSerializer
    permission_classes = [IsAdminOrReadOnly]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.soft_delete()
        return Response(
            {"message": "Department has been deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )
