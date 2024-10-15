from rest_framework import serializers

from room.models import Room


class RoomSerializer(serializers.ModelSerializer):
    building_name = serializers.CharField(source="building.name", read_only=True)

    class Meta:
        model = Room
        fields = ["id", "number", "floor", "building", "building_name"]
