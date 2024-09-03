from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.utils.dateparse import parse_date
from department.models import Department
from professor.models import Professor


class ProfessorAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.department = Department.objects.create(name="Engineering", acronym="ENG")
        self.professor_data = {
            "first_name": "John",
            "last_name": "Doe",
            "middle_name": "A",
            "date_of_birth": "1980-01-01",
            "has_masteral": True,
            "department": self.department.id,
            "employment_status": "PERMANENT",
            "required_units": 12,
            "current_units": 6,
            "handled_schedule": [],  # Empty handled_schedule
        }
        self.professor = Professor.objects.create(
            first_name="John",
            last_name="Doe",
            middle_name="A",
            date_of_birth=parse_date("1980-01-01"),
            has_masteral=True,
            department=self.department,
            employment_status="PERMANENT",
            required_units=12,
            current_units=6,
        )

    def test_get_professors(self):
        response = self.client.get("/api/professors/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_specific_professor(self):
        professor_id = self.professor.id
        response = self.client.get(f"/api/professors/{professor_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)
        self.assertEqual(response.data["first_name"], self.professor.first_name)
        self.assertEqual(response.data["last_name"], self.professor.last_name)

    def test_get_non_existent_professor(self):
        non_existent_id = 9999
        response = self.client.get(f"/api/professors/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

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

    def test_delete_professor(self):
        professor_id = self.professor.id
        response = self.client.delete(f"/api/professors/{professor_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existent_professor(self):
        non_existent_id = 9999
        response = self.client.delete(f"/api/professors/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_after_delete(self):
        # Delete the professor
        professor_id = self.professor.id
        response = self.client.delete(f"/api/professors/{professor_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Attempt to create a new professor with the same data
        response = self.client.post(
            "/api/professors/", self.professor_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
