from rest_framework import serializers

from professor.models import Professor
from schedule.models import Schedule


class ProfessorSerializer(serializers.ModelSerializer):
    handled_schedule = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Schedule.objects.all(), allow_empty=True
    )
    department_name = serializers.CharField(source="department.name", read_only=True)

    # Additional department fields, if needed for clarity.
    department_id = serializers.IntegerField(source="department.id", read_only=True)

    class Meta:
        model = Professor
        fields = [
            "prof_id",
            "first_name",
            "last_name",
            "middle_name",  # If optional, you could add `required=False`
            "birth_date",
            "course_specialization",
            "has_masteral",  # If optional, add `required=False`
            "department",
            "department_name",  # Read-only field from related department
            "department_id",  # Additional field to clarify relationships
            "email",
            "gender",
            "employment_status",
            "required_units",
            "current_units",
            "handled_schedule",  # List of schedules the professor handles
        ]
        read_only_fields = ["middle_name"]

    def validate(self, data):
        """
        Perform custom validations.
        Ensuring `required_units` >= `current_units` if both are provided.
        """
        current_units = data.get("current_units")
        required_units = data.get("required_units")

        # Only perform the comparison if both fields are provided
        if current_units is not None and required_units is not None:
            if current_units > required_units:
                raise serializers.ValidationError(
                    "Current units cannot exceed required units."
                )

        return data

    def create(self, validated_data):
        """
        Custom creation logic if needed, especially for nested objects like `handled_schedule`.
        """
        handled_schedule_data = validated_data.pop("handled_schedule", [])
        professor = Professor.objects.create(**validated_data)

        # Associate the schedule (if provided) after the professor is created.
        professor.handled_schedule.set(handled_schedule_data)

        return professor

    def update(self, instance, validated_data):
        """
        Custom update logic for updating a professor's information along with schedules.
        """
        handled_schedule_data = validated_data.pop("handled_schedule", None)

        # Update the professor instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update the related schedules if handled_schedule is provided
        if handled_schedule_data is not None:
            instance.handled_schedule.set(handled_schedule_data)

        return instance
