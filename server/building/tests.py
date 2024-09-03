from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from building.models import Building


class BuildingAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.building_data = {
            "name": "Engineering Building",
            "total_rooms": 10,
            "available_rooms": 8,
        }
        self.building = Building.objects.create(
            name="Engineering Building",
            total_rooms=10,
            available_rooms=8,
        )

    def test_get_buildings(self):
        response = self.client.get("/api/buildings/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_get_specific_building(self):
        building_id = self.building.id
        response = self.client.get(f"/api/buildings/{building_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)
        self.assertEqual(response.data["name"], self.building.name)
        self.assertEqual(response.data["total_rooms"], self.building.total_rooms)

    def test_get_non_existent_building(self):
        non_existent_id = 9999
        response = self.client.get(f"/api/buildings/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_building(self):
        response = self.client.post(
            "/api/buildings/", self.building_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"]["name"], self.building_data["name"])
        self.assertEqual(
            response.data["data"]["total_rooms"], self.building_data["total_rooms"]
        )

    def test_delete_building(self):
        building_id = self.building.id
        response = self.client.delete(f"/api/buildings/{building_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existent_building(self):
        non_existent_id = 9999
        response = self.client.delete(f"/api/buildings/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_after_delete(self):
        # Delete the building
        building_id = self.building.id
        response = self.client.delete(f"/api/buildings/{building_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Attempt to create a new building with the same data
        response = self.client.post(
            "/api/buildings/", self.building_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
