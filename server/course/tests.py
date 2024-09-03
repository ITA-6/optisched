from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from course.models import Course


class CourseAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.course_data = {
            "name": "Introduction to Programming",
            "code": 101,
            "category": "LECTURE",
            "total_units": 3,
            "total_hours": 45,
            "need_masteral": True,
        }
        self.course = Course.objects.create(
            name="Introduction to Programming",
            code=101,
            category="LECTURE",
            total_units=3,
            total_hours=45,
            need_masteral=True,
        )

    def test_get_courses(self):
        response = self.client.get("/api/courses/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_get_specific_course(self):
        course_id = self.course.id
        response = self.client.get(f"/api/courses/{course_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)
        self.assertEqual(response.data["name"], self.course.name)
        self.assertEqual(response.data["code"], self.course.code)

    def test_get_non_existent_course(self):
        non_existent_id = 9999
        response = self.client.get(f"/api/courses/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_course(self):
        response = self.client.post("/api/courses/", self.course_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"]["name"], self.course_data["name"])
        self.assertEqual(response.data["data"]["code"], self.course_data["code"])

    def test_delete_course(self):
        course_id = self.course.id
        response = self.client.delete(f"/api/courses/{course_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existent_course(self):
        non_existent_id = 9999
        response = self.client.delete(f"/api/courses/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_after_delete(self):
        # Delete the course
        course_id = self.course.id
        response = self.client.delete(f"/api/courses/{course_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Attempt to create a new course with the same data
        response = self.client.post("/api/courses/", self.course_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
