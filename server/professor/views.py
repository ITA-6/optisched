from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from professor.models import Professor
from professor.serializers import ProfessorSerializer
from account.models import CustomUser, ActivityHistory
from account.serializers import AccountSerializer
from department.models import Department

from django.utils.timezone import now


class ProfessorManager:
    @staticmethod
    def create_account(user_data):
        user_serializer = AccountSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        return user

    @staticmethod
    def update_account(user_data):
        user_serializer = AccountSerializer(user_data, data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        return user

    @staticmethod
    def get_user_by_id(id):
        try:
            return CustomUser.objects.get(user_id=id)
        except CustomUser.DoesNotExist:
            return None


class ProfessorAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def log_activity(self, request, action, instance=None, description=None):
        """
        Logs activity into the ActivityHistory model.

        Args:
            request (HttpRequest): The HTTP request object.
            action (str): Action type (e.g., CREATE, UPDATE, DELETE).
            instance (Model): The Professor instance involved (optional).
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
            model_name="Professor",
            object_id=str(instance.id) if instance else None,
            description=description,
            ip_address=ip_address,
            user_agent=user_agent,
            time=now(),
        )

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")

        if pk:
            return self.get_professor_detail(pk)
        else:
            return self.get_all_professors(request)

    def get_all_professors(self, request):
        user = request.user

        if user.get_privilege() == "admin":
            professors = Professor.objects.all()
        elif user.get_privilege() == "sub_admin":
            if not user.department:
                return Response(
                    {"error": "User does not have an assigned department."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            professors = Professor.objects.filter(department=user.department)
        else:
            return Response(
                {"error": "You do not have permission to view professors."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = ProfessorSerializer(professors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_professor_detail(self, pk):
        try:
            professor = Professor.objects.get(pk=pk)
            serializer = ProfessorSerializer(professor)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Professor.DoesNotExist:
            return Response(
                {"error": "Professor not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request, *args, **kwargs):
        department = request.user.department.id
        if not self.is_valid_department(department):
            return Response(
                {"error": "Department not found"}, status=status.HTTP_404_NOT_FOUND
            )

        professor_data = self.build_professor_data(request.data)
        professor_data["department"] = department

        professor_serializer = ProfessorSerializer(data=professor_data)
        professor_serializer.is_valid(raise_exception=True)

        user_id = professor_data.get("prof_id")
        user = ProfessorManager.get_user_by_id(user_id)

        if user:
            professor = professor_serializer.save()
            user.professor = professor
            user.save()

            # Log the activity
            self.log_activity(
                request,
                action="CREATE",
                instance=professor,
                description="Professor linked to existing user account.",
            )

            data = {
                "message": "Professor has been created and linked to an existing user account.",
                "data": professor_serializer.data,
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            professor = professor_serializer.save()
            user_data = self.build_user_data(professor)
            ProfessorManager.create_account(user_data)

            # Log the activity
            self.log_activity(
                request,
                action="CREATE",
                instance=professor,
                description="Professor created with a new user account.",
            )

            data = {
                "message": "Professor has been created with a new user account.",
                "data": professor_serializer.data,
            }
            return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            professor = Professor.objects.get(prof_id=pk)
        except Professor.DoesNotExist:
            return Response(
                {"error": "Professor not found"}, status=status.HTTP_404_NOT_FOUND
            )

        department_id = request.user.department.id
        request.data["department"] = department_id

        if not self.is_valid_department(department_id):
            return Response(
                {"error": "Department not found"}, status=status.HTTP_404_NOT_FOUND
            )

        professor_data = self.build_professor_data(request.data)
        professor_serializer = ProfessorSerializer(professor, data=professor_data)
        professor_serializer.is_valid(raise_exception=True)
        professor = professor_serializer.save()

        # Log the activity
        self.log_activity(
            request,
            action="UPDATE",
            instance=professor,
            description="Professor details updated.",
        )

        data = {
            "message": "Professor has been updated.",
            "data": professor_serializer.data,
        }
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            professor = Professor.objects.get(prof_id=pk)
            professor.delete()

            # Log the activity
            self.log_activity(
                request,
                action="DELETE",
                instance=professor,
                description="Professor deleted.",
            )

            return Response(
                {"message": "Professor has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Professor.DoesNotExist:
            return Response(
                {"error": "Professor not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def is_valid_department(self, department_id):
        return Department.objects.filter(id=department_id).exists()

    def build_professor_data(self, data):
        return {
            "prof_id": data.get("prof_id"),
            "first_name": data.get("first_name"),
            "last_name": data.get("last_name"),
            "middle_name": data.get("middle_name"),
            "birth_date": data.get("birth_date"),
            "course_specialization": data.get("course_specialization"),
            "department": data.get("department"),
            "email": data.get("email"),
            "gender": data.get("gender"),
            "employment_status": data.get("employment_status"),
            "required_units": data.get("required_units"),
            "current_units": data.get("current_units"),
            "handled_schedule": [],
        }

    def build_user_data(self, professor):
        return {
            "user_id": professor.prof_id,
            "username": professor.prof_id,
            "email": professor.email,
            "password": professor.birth_date.strftime("%Y-%m-%d"),
            "first_name": professor.first_name,
            "last_name": professor.last_name,
            "middle_name": professor.middle_name,
            "birth_date": professor.birth_date.strftime("%Y-%m-%d"),
            "department": professor.department.id,
            "professor": professor.id,
        }
