from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import NotFound

from professor.models import Professor
from professor.serializers import ProfessorSerializer
from account.serializers import AccountSerializer
from department.models import Department


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
        # Ensure department exists
        department_id = request.data.get("department")
        if not Department.objects.filter(id=department_id).exists():
            raise NotFound("Department not found")

        professor_data = {
            "prof_id": request.data.get("prof_id"),
            "first_name": request.data.get("first_name"),
            "last_name": request.data.get("last_name"),
            "middle_name": request.data.get("middle_name"),
            "birth_date": request.data.get("birth_date"),
            "department": request.data.get("department"),
            "email": request.data.get("email"),
            "gender": request.data.get("gender"),
            "employment_status": request.data.get("employment_status"),
            "required_units": request.data.get("required_units"),
            "current_units": request.data.get("current_units"),
            "handled_schedule": [],
        }

        professor_serializer = ProfessorSerializer(data=professor_data)
        professor_serializer.is_valid(raise_exception=True)
        professor = professor_serializer.save()

        user_data = {
            "username": professor.prof_id,
            "email": professor.email,
            "password": professor.birth_date.strftime("%Y-%m-%d"),
            "professor": professor.id,
        }

        ProfessorManager.create_account(user_data)

        data = {
            "message": "Professor has been created.",
            "data": professor_serializer.data,
        }

        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")

        try:
            professor = Professor.objects.get(prof_id=pk)
        except Department.DoesNotExist:
            return Response(
                {"message": "Professor not found."}, status=status.HTTP_404_NOT_FOUND
            )

        professor_data = {
            "prof_id": request.data.get("prof_id"),
            "first_name": request.data.get("first_name"),
            "last_name": request.data.get("last_name"),
            "middle_name": request.data.get("middle_name"),
            "birth_date": request.data.get("birth_date"),
            "department": request.data.get("department"),
            "email": request.data.get("email"),
            "gender": request.data.get("gender"),
            "employment_status": request.data.get("employment_status"),
            "required_units": request.data.get("required_units"),
            "current_units": request.data.get("current_units"),
            "handled_schedule": [],
        }

        professor_serializer = ProfessorSerializer(professor, data=professor_data)
        professor_serializer.is_valid(raise_exception=True)
        professor = professor_serializer.save()

        user_data = {
            "username": professor.prof_id,
            "email": professor.email,
            "password": professor.birth_date.strftime("%Y-%m-%d"),
            "professor": professor.id,
        }

        ProfessorManager.create_account(user_data)

        data = {
            "message": "Professor has been updated.",
            "data": professor_serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        print(pk)
        try:
            instance = Professor.objects.get(prof_id=pk)
            instance.delete()
            return Response(
                {"message": "Professor has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Professor.DoesNotExist:
            return Response(
                {"error": "Professor not found"}, status=status.HTTP_404_NOT_FOUND
            )
