from rest_framework import serializers
from .models import Constraint


class ConstraintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Constraint
        fields = [
            "id",
            "transition_time",
            "wait_time",
            "teaching_load",
            "daily_teaching_limit",
            "classroom_capacity",
            "room_occupancy",
            "laboratory_sessions",
            "permanent_workload",
            "temporary_workload",
            "part_time_workload",
            "start_time",
            "end_time",
        ]
