from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from account.models import ActivityHistory
from building.models import Building
from building.serializers import BuildingSerializer

from django.utils.timezone import now


class BuildingAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def log_activity(self, request, action, instance=None, description=None):
        """
        Logs activity into the ActivityHistory model.

        Args:
            request (HttpRequest): The HTTP request object.
            action (str): Action type (e.g., CREATE, UPDATE, DELETE).
            instance (Model): The Building instance involved (optional).
            description (str): Detailed description of the action (optional).
        """
        user = request.user if request.user.is_authenticated else None
        ip_address = (
            request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0]
            if "HTTP_X_FORWARDED_FOR" in request.META
            else request.META.get("REMOTE_ADDR")
        )
        user_agent = request.META.get("HTTP_USER_AGENT", "")

        ActivityHistory.objects.create(
            user=user,
            action=action,
            model_name="Building",
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
                building = Building.objects.get(pk=pk)
                serializer = BuildingSerializer(building)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Building.DoesNotExist:
                return Response(
                    {"error": "Building not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            buildings = Building.objects.all()
            serializer = BuildingSerializer(buildings, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = BuildingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        building = serializer.save()
        self.log_activity(
            request,
            action="CREATE",
            instance=building,
            description=f"Created a new building with ID {building.id}.",
        )
        data = {"message": "Building has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            building = Building.objects.get(pk=pk)
        except Building.DoesNotExist:
            return Response(
                {"message": "Building not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = BuildingSerializer(building, data=request.data)
        serializer.is_valid(raise_exception=True)
        updated_building = serializer.save()

        self.log_activity(
            request,
            action="UPDATE",
            instance=updated_building,
            description=f"Updated building with ID {pk}.",
        )
        data = {"message": "Building has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")

        try:
            building = Building.objects.get(pk=pk)
            building.delete()
            self.log_activity(
                request,
                action="DELETE",
                instance=building,
                description=f"Deleted building with ID {pk}.",
            )
            return Response(
                {"message": "Building has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Building.DoesNotExist:
            return Response(
                {"error": "Building not found"}, status=status.HTTP_404_NOT_FOUND
            )
