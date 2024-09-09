from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from department.models import Department


class ProfessorAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        self.department = Department.objects.create(name="Engineering", acronym="ENG")

        self.professor_data = {
            "prof_id": "2101264",
            "first_name": "John",
            "last_name": "Doe",
            "middle_name": "A",
            "birth_date": "1980-01-01",
            "has_masteral": True,
            "department": self.department.id,
            "employment_status": "PERMANENT",
            "required_units": 12,
            "current_units": 6,
            "handled_schedule": [],
        }

    def test_create_professor(self):
        response = self.client.post(
            "/api/professors/", self.professor_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "Professor has been created.")
        self.assertEqual(
            response.data["data"]["first_name"], self.professor_data["first_name"]
        )
        self.assertEqual(
            response.data["data"]["last_name"], self.professor_data["last_name"]
        )
