from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from account.models import ActivityHistory
from department.models import Department
from department.serializers import DepartmentSerializer

from django.utils.timezone import now


class DepartmentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def log_activity(self, request, action, instance=None, description=None):
        """
        Logs activity into the ActivityHistory model.

        Args:
            request (HttpRequest): The HTTP request object.
            action (str): Action type (e.g., CREATE, UPDATE, DELETE).
            instance (Model): The Department instance involved (optional).
            description (str): Detailed description of the action (optional).
        """
        user = request.user if request.user.is_authenticated else None
        ip_address = (
            request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0]
            if "HTTP_X_FORWARDED_FOR" in request.META
            else request.META.get("REMOTE_ADDR")
        )
        user_agent = request.META.get("HTTP_USER_AGENT", "")

        ActivityHistory.objects.create(
            user=user,
            action=action,
            model_name="Department",
            object_id=str(instance.id) if instance else None,
            description=description,
            ip_address=ip_address,
            user_agent=user_agent,
            time=now(),
        )

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

        # Log the creation activity
        self.log_activity(
            request,
            action="CREATE",
            instance=department,
            description=f"Created a new department with name {department.name}.",
        )

        data = {
            "message": "Department has been created.",
            "data": {
                "department_name": department.name,
                "department_acronym": department.acronym,
            },
        }
        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            department = Department.objects.get(pk=pk)
        except Department.DoesNotExist:
            return Response(
                {"message": "Department not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = DepartmentSerializer(department, data=request.data)
        serializer.is_valid(raise_exception=True)
        updated_department = serializer.save()

        # Log the update activity
        self.log_activity(
            request,
            action="UPDATE",
            instance=updated_department,
            description=f"Updated department with name {updated_department.name}.",
        )

        data = {"message": "Department has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            department = Department.objects.get(pk=pk)
            department.delete()

            # Log the delete activity
            self.log_activity(
                request,
                action="DELETE",
                instance=department,
                description=f"Deleted department with name {department.name}.",
            )

            return Response(
                {"message": "Department has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Department.DoesNotExist:
            return Response(
                {"error": "Department not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
