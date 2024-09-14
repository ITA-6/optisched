from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from building.models import Building
from building.serializers import BuildingSerializer


class BuildingAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

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
        serializer.save()
        data = {"message": "Building has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        # Retrieve the existing instance of Building
        try:
            building = Building.objects.get(pk=pk)
        except Building.DoesNotExist:
            return Response(
                {"message": "Building not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Pass the instance to the serializer along with the new data
        serializer = BuildingSerializer(building, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = {"message": "Building has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")

        try:
            instance = Building.objects.get(pk=pk)
            instance.delete()
            return Response(
                {"message": "Building has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Building.DoesNotExist:
            return Response(
                {"error": "Building not found"}, status=status.HTTP_404_NOT_FOUND
            )
