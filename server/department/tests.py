from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from department.models import Department


class DepartmentAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.department_data = {"name": "Engineering", "acronym": "ENG"}
        self.department = Department.objects.create(**self.department_data)

    def test_get_departments(self):
        response = self.client.get("/api/departments/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_department(self):
        department_id = self.department.id
        response = self.client.get(f"/api/departments/{department_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.department.name)
        self.assertEqual(response.data["acronym"], self.department.acronym)

    def test_create_department(self):
        new_department_data = {"name": "Human Resources", "acronym": "HR"}
        response = self.client.post(
            "/api/departments/", new_department_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_duplicate_department(self):
        duplicate_department_data = {"name": "Engineering", "acronym": "ENG"}
        response = self.client.post(
            "/api/departments/", duplicate_department_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_department(self):
        department_id = self.department.id
        response = self.client.delete(f"/api/departments/{department_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existent_department(self):
        non_existent_id = 9999
        response = self.client.delete(f"/api/departments/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_already_deleted_department(self):
        department_id = self.department.id

        response = self.client.delete(f"/api/departments/{department_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        response = self.client.delete(f"/api/departments/{department_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_after_delete(self):
        # Delete the department
        department_id = self.department.id
        response = self.client.delete(f"/api/departments/{department_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Attempt to create a new department with the same name and acronym
        new_department_data = {"name": "Engineering", "acronym": "ENG"}
        response = self.client.post(
            "/api/departments/", new_department_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
