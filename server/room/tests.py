from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from building.models import Building
from room.models import Room


class RoomAPIViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.building = Building.objects.create(
            name="Engineering Building",
            total_rooms=10,
            available_rooms=8,
        )
        self.room_data = {
            "number": 101,
            "floor": 1,
            "building": self.building.id,
        }
        self.room = Room.objects.create(
            number=101,
            floor=1,
            building=self.building,
        )

    def test_get_rooms(self):
        response = self.client.get("/api/rooms/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_get_specific_room(self):
        room_id = self.room.id
        response = self.client.get(f"/api/rooms/{room_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)
        self.assertEqual(response.data["number"], self.room.number)
        self.assertEqual(response.data["floor"], self.room.floor)

    def test_get_non_existent_room(self):
        non_existent_id = 9999
        response = self.client.get(f"/api/rooms/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_room(self):
        response = self.client.post("/api/rooms/", self.room_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"]["number"], self.room_data["number"])
        self.assertEqual(response.data["data"]["floor"], self.room_data["floor"])

    def test_delete_room(self):
        room_id = self.room.id
        response = self.client.delete(f"/api/rooms/{room_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existent_room(self):
        non_existent_id = 9999
        response = self.client.delete(f"/api/rooms/{non_existent_id}/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_after_delete(self):
        # Delete the room
        room_id = self.room.id
        response = self.client.delete(f"/api/rooms/{room_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Attempt to create a new room with the same data
        response = self.client.post("/api/rooms/", self.room_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
