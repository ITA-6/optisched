from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from building.models import Building
from room.models import Room
from room.serializers import RoomSerializer


class RoomAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk:
            try:
                room = Room.objects.get(pk=pk)
                serializer = RoomSerializer(room)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Room.DoesNotExist:
                return Response(
                    {"error": "Room not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            rooms = Room.objects.all()
            serializer = RoomSerializer(rooms, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = RoomSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        building_id = serializer.validated_data.get("building").id
        building = Building.objects.get(id=building_id)

        # Check if there are available rooms
        if building.available_rooms <= 0:
            return Response(
                {"message": "No available rooms in the building."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check for uniqueness of number and floor in the building
        number = serializer.validated_data.get("number")
        floor = serializer.validated_data.get("floor")

        if Room.objects.filter(number=number, floor=floor, building=building).exists():
            return Response(
                {
                    "message": "A room with this number and floor already exists in the building."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()

        data = {"message": "Room has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        # Retrieve the existing instance of Building
        try:
            course = Room.objects.get(pk=pk)
        except Room.DoesNotExist:
            return Response(
                {"message": "Room not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Pass the instance to the serializer along with the new data
        serializer = RoomSerializer(course, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = {"message": "Room has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")

        try:
            instance = Room.objects.get(pk=pk)
            instance.delete()
            return Response(
                {"message": "Room has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Room.DoesNotExist:
            return Response(
                {"error": "Room not found"}, status=status.HTTP_404_NOT_FOUND
            )
