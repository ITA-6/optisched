from rest_framework import serializers

from program.models import Program


class ProgramSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)

    class Meta:
        model = Program

        fields = ["id", "name", "acronym", "department", "department_name"]
