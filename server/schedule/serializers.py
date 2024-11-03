# schedule/serializers.py
from rest_framework import serializers


class CourseScheduleSerializer(serializers.Serializer):
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
    courses = CourseScheduleSerializer(many=True)
