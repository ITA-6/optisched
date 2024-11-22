# schedule/serializers.py
from rest_framework import serializers
from .models import Schedule, CourseSchedule, TimeSlot


class CourseScheduleSerializerV2(serializers.Serializer):
    professor_name = serializers.CharField()
    course_code = serializers.CharField()
    course_description = serializers.CharField()
    lecture_units = serializers.IntegerField()
    lab_units = serializers.IntegerField()
    lecture_time_range = serializers.CharField()
    lab_time_range = serializers.CharField()
    lecture_day_of_week = serializers.CharField()
    lab_day_of_week = serializers.CharField()
    lecture_room_number = serializers.CharField()
    lab_room_number = serializers.CharField()
    building_name = serializers.CharField()


class SectionScheduleSerializer(serializers.Serializer):
    year_level = serializers.IntegerField()
    semester = serializers.CharField()
    program_name = serializers.CharField()
    department_name = serializers.CharField()
    section_label = serializers.CharField()
    courses = CourseScheduleSerializerV2(many=True)


class TimeSlotSerializer(serializers.ModelSerializer):
    day_of_week = serializers.CharField(source="get_day_of_week_display")
    start_time = serializers.TimeField(format="%I:%M %p")
    end_time = serializers.TimeField(format="%I:%M %p")

    class Meta:
        model = TimeSlot
        fields = ["day_of_week", "start_time", "end_time"]


class CourseScheduleSerializer(serializers.ModelSerializer):
    course_code = serializers.CharField(source="course.code")
    course_description = serializers.CharField(source="course.name")
    lecture_units = serializers.IntegerField(source="course.lecture_unit")
    lab_units = serializers.IntegerField(source="course.lab_unit")
    professor_name = serializers.SerializerMethodField()
    lecture_time_range = serializers.SerializerMethodField()
    lab_time_range = serializers.SerializerMethodField()
    lecture_day_of_week = serializers.SerializerMethodField()
    lab_day_of_week = serializers.SerializerMethodField()
    lecture_room_number = serializers.CharField(
        source="lecture_room.number", required=False
    )
    lab_room_number = serializers.CharField(source="lab_room.number", required=False)
    building_name = serializers.CharField()

    class Meta:
        model = CourseSchedule
        fields = [
            "professor_name",
            "course_code",
            "course_description",
            "lecture_units",
            "lab_units",
            "lecture_time_range",
            "lab_time_range",
            "lecture_day_of_week",
            "lab_day_of_week",
            "lecture_room_number",
            "lab_room_number",
        ]

    def get_professor_name(self, obj):
        if obj.professor:
            return f"{obj.professor.first_name} {obj.professor.last_name}"
        return None

    def get_lecture_time_range(self, obj):
        if obj.lecture_time_range:
            start = obj.lecture_time_range.start_time.strftime("%I:%M %p")
            end = obj.lecture_time_range.end_time.strftime("%I:%M %p")
            return f"{start} - {end}"
        return "Time Not Assigned"

    def get_lab_time_range(self, obj):
        if obj.lab_time_range:
            start = obj.lab_time_range.start_time.strftime("%I:%M %p")
            end = obj.lab_time_range.end_time.strftime("%I:%M %p")
            return f"{start} - {end}"
        return "Time Not Assigned"

    def get_lecture_day_of_week(self, obj):
        if obj.lecture_time_range:
            return obj.lecture_time_range.get_day_of_week_display()
        return "Day Not Assigned"

    def get_lab_day_of_week(self, obj):
        if obj.lab_time_range:
            return obj.lab_time_range.get_day_of_week_display()
        return "Day Not Assigned"


class ScheduleSerializer(serializers.ModelSerializer):
    semester = serializers.CharField(source="get_semester_display")
    program_name = serializers.CharField(source="program.name", required=False)
    department_name = serializers.CharField(source="department.name", required=False)
    section_label = serializers.CharField(source="section.label", required=False)
    courses = CourseScheduleSerializer(many=True)

    class Meta:
        model = Schedule
        fields = [
            "year_level",
            "semester",
            "program_name",
            "department_name",
            "section_label",
            "courses",
        ]
