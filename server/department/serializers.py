from .models import Department
from rest_framework import serializers


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["id", "name", "acronym", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_name(self, value):
        """
        Check if the department name already exists.
        """
        if self.instance and self.instance.name == value:
            return value  # If updating and name is unchanged, no validation needed

        if Department.objects.filter(name=value, is_active=True).exists():
            raise serializers.ValidationError(
                "A department with this name already exists."
            )

        return value
