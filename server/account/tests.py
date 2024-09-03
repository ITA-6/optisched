from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from account.models import CustomUser


class CustomUserTests(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Register URL
        self.register_url = reverse("register")

        # Login URL
        self.login_url = reverse("login")

        # Sample user data
        self.user_data = {
            "username": "john_doe",
            "email": "john@example.com",
            "password": "securepassword",
            "first_name": "John",
            "last_name": "Doe",
        }

        # Create a user for login tests
        self.user = CustomUser.objects.create_user(
            username="jane_doe",
            email="jane@example.com",
            password="securepassword",
            first_name="Jane",
            last_name="Doe",
        )

    def test_register_user(self):
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["username"], self.user_data["username"])
        self.assertEqual(response.data["email"], self.user_data["email"])

    def test_login_user(self):
        login_data = {"username": "jane_doe", "password": "securepassword"}
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_user_invalid_credentials(self):
        login_data = {"username": "jane_doe", "password": "wrongpassword"}
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_inactive_user(self):
        self.user.is_active = False
        self.user.save()
        login_data = {"username": "jane_doe", "password": "securepassword"}
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn("error", response.data)
