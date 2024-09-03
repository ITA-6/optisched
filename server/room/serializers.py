from rest_framework import serializers

from room.models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["number", "floor", "building"]
