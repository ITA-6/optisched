from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from account.models import ActivityHistory
from program.models import Program
from program.serializers import ProgramSerializer

from django.utils.timezone import now


class ProgramAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def log_activity(self, request, action, instance=None, description=None):
        """
        Logs activity into the ActivityHistory model.

        Args:
            request (HttpRequest): The HTTP request object.
            action (str): Action type (e.g., CREATE, UPDATE, DELETE).
            instance (Model): The Program instance involved (optional).
            description (str): Detailed description of the action (optional).
        """
        user = request.user
        ip_address = (
            request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0]
            if "HTTP_X_FORWARDED_FOR" in request.META
            else request.META.get("REMOTE_ADDR")
        )
        user_agent = request.META.get("HTTP_USER_AGENT", "")

        ActivityHistory.objects.create(
            user=user,
            action=action,
            model_name="Program",
            object_id=str(instance.id) if instance else None,
            description=description,
            ip_address=ip_address,
            user_agent=user_agent,
            time=now(),
        )

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        user = request.user
        user_privilege = user.get_privilege()

        if pk:
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

        request.data["department"] = department
        serializer = ProgramSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        program = serializer.save()

        # Log the creation activity
        self.log_activity(
            request,
            action="CREATE",
            instance=program,
            description=f"Created a new program with ID {program.id}.",
        )

        data = {"message": "Program has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        department_id = request.user.department.id
        request.data["department"] = department_id

        try:
            program = Program.objects.get(pk=pk)
        except Program.DoesNotExist:
            return Response(
                {"message": "Program not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProgramSerializer(program, data=request.data)
        serializer.is_valid(raise_exception=True)
        updated_program = serializer.save()

        # Log the update activity
        self.log_activity(
            request,
            action="UPDATE",
            instance=updated_program,
            description=f"Updated program with ID {updated_program.id}.",
        )

        data = {"message": "Program has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            program = Program.objects.get(pk=pk)
            program.delete()

            # Log the delete activity
            self.log_activity(
                request,
                action="DELETE",
                instance=program,
                description=f"Deleted program with ID {pk}.",
            )

            return Response(
                {"message": "Program has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Program.DoesNotExist:
            return Response(
                {"error": "Program not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
