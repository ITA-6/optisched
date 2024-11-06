# schedule/serializers.py
from rest_framework import serializers
from professor.models import Professor
from room.models import Room
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
    professor_name = serializers.CharField(
        source="professor.first_name", required=False
    )
    lecture_time_range = serializers.SerializerMethodField()
    lab_time_range = serializers.SerializerMethodField()
    lecture_day_of_week = serializers.SerializerMethodField()
    lab_day_of_week = serializers.SerializerMethodField()
    lecture_room_number = serializers.CharField(
        source="lecture_room.number", required=False
    )
    lab_room_number = serializers.CharField(source="lab_room.number", required=False)

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
    year_level = serializers.CharField(source="get_year_level_display")
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


class ProfessorSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name")

    class Meta:
        model = Professor
        fields = ["first_name", "department_name"]


class ProfessorTimeSlotSerializer(serializers.ModelSerializer):
    day_of_week = serializers.CharField(source="get_day_of_week_display")

    class Meta:
        model = TimeSlot
        fields = ["day_of_week", "start_time", "end_time"]


class ProfessorRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["number"]


class ProfessorCourseSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer()
    course_details = serializers.SerializerMethodField()
    lecture_time_range = TimeSlotSerializer()
    lab_time_range = TimeSlotSerializer(allow_null=True)
    lecture_room = ProfessorRoomSerializer()
    lab_room = ProfessorRoomSerializer(allow_null=True)

    class Meta:
        model = CourseSchedule
        fields = [
            "course_details",
            "professor",
            "lecture_time_range",
            "lab_time_range",
            "lecture_room",
            "lab_room",
        ]

    def get_course_details(self, obj):
        return {
            "code": obj.course.code,
            "description": obj.course.name,
            "lecture_units": obj.course.lecture_unit,
            "lab_units": obj.course.lab_unit,
        }


class ProfessorScheduleSerializer(serializers.ModelSerializer):
    section_label = serializers.CharField(source="section.label")
    courses = serializers.SerializerMethodField()
    total_units = serializers.SerializerMethodField()

    class Meta:
        model = Schedule
        fields = [
            "section_label",
            "courses",
            "total_units",
        ]

    def get_courses(self, obj):
        # Only retrieve courses assigned to the specific professor
        professor = self.context.get("professor")
        courses = obj.courses.filter(professor=professor)
        return ProfessorCourseSerializer(courses, many=True).data

    def get_total_units(self, obj):
        professor = self.context.get("professor")
        # Sum lecture and lab units only for the courses assigned to this professor
        return sum(
            course.course.lecture_unit + course.course.lab_unit
            for course in obj.courses.filter(professor=professor)
        )
