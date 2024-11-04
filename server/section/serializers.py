from rest_framework import serializers
from section.models import Section


class SectionSerializer(serializers.ModelSerializer):
    program_name = serializers.CharField(source="program.name", read_only=True)
    department_name = serializers.CharField(source="department.name", read_only=True)

    class Meta:
        model = Section
        fields = [
            "id",
            "label",
            "year_level",
            "program_name",
            "department_name",
        ]
