from django.contrib.auth import get_user_model
from django.utils.dateparse import parse_date
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from department.models import Department
from professor.models import Professor


class RegisterApiViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        self.register_url = reverse("register")

        self.department = Department.objects.create(name="Engineering", acronym="ENG")

        self.professor = Professor.objects.create(
            prof_id=2101264,
            first_name="John",
            last_name="Doe",
            middle_name="A",
            birth_date=parse_date("1980-01-01"),
            has_masteral=True,
            department=self.department,
            employment_status="PERMANENT",
            required_units=12,
            current_units=6,
        )

        self.professor = Professor.objects.create(
            prof_id=2101264,
            first_name="John",
            last_name="Doe",
            middle_name="A",
            birth_date=parse_date("1980-01-01"),
            has_masteral=True,
            department=self.department,
            employment_status="PERMANENT",
            required_units=12,
            current_units=6,
        )

        self.account_data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword123",
            "professor": self.professor.id,
        }

    def test_register_user_success(self):
        response = response = self.client.post(
            self.register_url, self.account_data, format="json"
        )

        # Check that the response is HTTP 201 CREATED
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check that the user was actually created
        user = get_user_model().objects.get(username=self.account_data["username"])
        self.assertEqual(user.email, self.account_data["email"])

        # Check that the response data is correct
        self.assertEqual(response.data["response"], "account has been created")
        self.assertEqual(response.data["username"], self.account_data["username"])
        self.assertEqual(response.data["email"], self.account_data["email"])
