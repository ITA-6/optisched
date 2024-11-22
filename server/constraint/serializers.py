from rest_framework import serializers
from .models import Constraint


class ConstraintSerializer(serializers.ModelSerializer):
    start_time = serializers.TimeField(format="%H:%M")
    end_time = serializers.TimeField(format="%H:%M")

    class Meta:
        model = Constraint
        fields = [
            "id",
            "transition_time",
            "wait_time",
            "daily_teaching_limit",
            "laboratory_sessions",
            "permanent_workload",
            "temporary_workload",
            "part_time_workload",
            "semester",
            "start_time",
            "end_time",
        ]
