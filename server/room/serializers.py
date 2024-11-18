from rest_framework import serializers

from room.models import Room


class RoomSerializer(serializers.ModelSerializer):
    building_name = serializers.CharField(source="building.name", read_only=True)
    program_name = serializers.CharField(source="program.name", read_only=True)
    department_name = serializers.CharField(source="department.name", read_only=True)

    class Meta:
        model = Room
        fields = [
            "id",
            "number",
            "floor",
            "building",
            "building_name",
            "program_name",
            "department_name",
            "department",
            "program",
        ]
