from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from account.models import ActivityHistory
from building.models import Building
from room.models import Room
from room.serializers import RoomSerializer

from django.utils.timezone import now


class RoomAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def log_activity(self, request, action, instance=None, description=None):
        """
        Logs activity into the ActivityHistory model.

        Args:
            request (HttpRequest): The HTTP request object.
            action (str): Action type (e.g., CREATE, UPDATE, DELETE).
            instance (Model): The Room instance involved (optional).
            description (str): Detailed description of the action (optional).
        """
        user = request.user
        ip_address = (
            request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0]
            if "HTTP_X_FORWARDED_FOR" in request.META
            else request.META.get("REMOTE_ADDR")
        )
        user_agent = request.META.get("HTTP_USER_AGENT", "")

        ActivityHistory.objects.create(
            user=user,
            action=action,
            model_name="Room",
            object_id=str(instance.id) if instance else None,
            description=description,
            ip_address=ip_address,
            user_agent=user_agent,
            time=now(),
        )

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
            rooms = Room.objects.filter(is_active=True)
            serializer = RoomSerializer(rooms, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        department_id = request.user.department.id
        request.data["department"] = department_id
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

        room = serializer.save()

        # Log the creation activity
        self.log_activity(
            request,
            action="CREATE",
            instance=room,
            description=f"Created a new room with ID {room.id} in building {building.name}.",
        )

        data = {"message": "Room has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        department_id = request.user.department.id
        request.data["department"] = department_id

        try:
            room = Room.objects.get(pk=pk)
        except Room.DoesNotExist:
            return Response(
                {"message": "Room not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = RoomSerializer(room, data=request.data)
        serializer.is_valid(raise_exception=True)
        updated_room = serializer.save()

        # Log the update activity
        self.log_activity(
            request,
            action="UPDATE",
            instance=updated_room,
            description=f"Updated room with ID {updated_room.id}.",
        )

        data = {"message": "Room has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            room = Room.objects.get(pk=pk)
            room.delete()

            # Log the delete activity
            self.log_activity(
                request,
                action="DELETE",
                instance=room,
                description=f"Deleted room with ID {pk}.",
            )

            return Response(
                {"message": "Room has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Room.DoesNotExist:
            return Response(
                {"error": "Room not found"}, status=status.HTTP_404_NOT_FOUND
            )
