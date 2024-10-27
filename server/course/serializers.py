from rest_framework import serializers
from course.models import Course


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            "id",
            "name",
            "code",
            "category",
            "lab_unit",
            "lecture_unit",
            "lab_hours",
            "lecture_hours",
            "need_masteral",
            "pre_requisites",
            "co_requisites",
        ]
