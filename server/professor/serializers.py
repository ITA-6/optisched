from rest_framework import serializers

from professor.models import Professor
from schedule.models import Schedule


class ProfessorSerializer(serializers.ModelSerializer):
    handled_schedule = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Schedule.objects.all(), allow_empty=True
    )

    class Meta:
        model = Professor
        fields = [
            "prof_id",
            "first_name",
            "last_name",
            "middle_name",
            "birth_date",
            "has_masteral",
            "department",
            "email",
            "gender",
            "employment_status",
            "required_units",
            "current_units",
            "handled_schedule",
        ]
