from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from section.models import Section
from professor.models import Professor
from department.models import Department


class SectionAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Create a Department instance
        self.department = Department.objects.create(name="Engineering", acronym="ENG")

        # Create a Professor instance with the created Department
        self.professor = Professor.objects.create(
            first_name="John",
            last_name="Doe",
            middle_name="A",
            employment_status="PERMANENT",
            has_masteral=True,
            department=self.department,
            required_units=12,
            current_units=6,
            date_of_birth="1980-01-01",
        )

        self.section_data = {
            "label": "A1",
            "year_level": 1,
            "adviser": self.professor.id,
        }

        self.section = Section.objects.create(
            label="A1",
            year_level=1,
            adviser=self.professor,
        )

    def test_get_sections(self):
        response = self.client.get("/api/sections/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_get_specific_section(self):
        section_id = self.section.id
        response = self.client.get(f"/api/sections/{section_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)
        self.assertEqual(response.data["label"], self.section.label)
        self.assertEqual(response.data["year_level"], self.section.year_level)

    def test_get_non_existent_section(self):
        non_existent_id = 9999
        response = self.client.get(f"/api/sections/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_section(self):
        response = self.client.post("/api/sections/", self.section_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"]["label"], self.section_data["label"])
        self.assertEqual(
            response.data["data"]["year_level"], self.section_data["year_level"]
        )

    def test_delete_section(self):
        section_id = self.section.id
        response = self.client.delete(f"/api/sections/{section_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existent_section(self):
        non_existent_id = 9999
        response = self.client.delete(f"/api/sections/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_after_delete(self):
        # Delete the section
        section_id = self.section.id
        response = self.client.delete(f"/api/sections/{section_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Attempt to create a new section with the same data
        response = self.client.post("/api/sections/", self.section_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
