from rest_framework import serializers
from section.models import Section


class SectionSerializer(serializers.ModelSerializer):
    program_name = serializers.CharField(source="program.name", read_only=True)
    department_name = serializers.CharField(source="department.name", read_only=True)
    adviser_name = serializers.SerializerMethodField()  # Custom field for adviser name

    class Meta:
        model = Section
        fields = [
            "id",
            "label",
            "year_level",
            "adviser_name",  # Replace adviser ID with adviser name
            "program_name",
            "department_name",
        ]

    def get_adviser_name(self, obj):
        # Check if adviser exists and return the full name
        if obj.adviser:
            return f"{obj.adviser.first_name} {obj.adviser.last_name}"
        return None  # Return None if no adviser is assigned
