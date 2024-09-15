from rest_framework import serializers
from schedule.models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    professor_first_name = serializers.CharField(
        source="professor.first_name", read_only=True
    )
    professor_last_name = serializers.CharField(
        source="professor.last_name", read_only=True
    )
    course_name = serializers.CharField(source="course.name", read_only=True)
    room_number = serializers.CharField(source="room.number", read_only=True)
    section_label = serializers.CharField(source="section.label", read_only=True)

    class Meta:
        model = Schedule
        fields = [
            "course",
            "course_name",
            "professor",
            "professor_first_name",
            "professor_last_name",
            "room",
            "room_number",
            "section",
            "section_label",
            "day_of_week",
            "start_time",
            "end_time",
        ]
