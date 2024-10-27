# schedule/serializers.py

from rest_framework import serializers
from schedule.models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    professor_name = serializers.SerializerMethodField()
    room_number = serializers.CharField(source="room.number", read_only=True)
    course_names = serializers.SerializerMethodField()
    program_name = serializers.CharField(source="program.name", read_only=True)
    department_name = serializers.CharField(source="department.name", read_only=True)
    section_label = serializers.CharField(source="section.label", read_only=True)
    section_year_level = serializers.IntegerField(
        source="section.year_level", read_only=True
    )

    class Meta:
        model = Schedule
        fields = [
            "id",
            "year_level",
            "semester",
            "program_name",  # Display program name instead of ID
            "department_name",  # Display department name instead of ID
            "course_names",
            "professor_name",
            "room_number",
            "section_label",  # Display section label
            "section_year_level",  # Display section year level
            "day_of_week",
            "start_time",
            "end_time",
        ]

    def get_professor_name(self, obj):
        # Returns the full name of the professor if assigned
        if obj.professor:
            return f"{obj.professor.first_name} {obj.professor.last_name}"
        return None

    def get_course_names(self, obj):
        # Returns a list of course names associated with the schedule
        return [course.name for course in obj.courses.all()]
