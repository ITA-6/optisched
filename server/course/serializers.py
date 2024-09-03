from rest_framework import serializers
from course.models import Course


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            "name",
            "code",
            "category",
            "total_units",
            "total_hours",
            "need_masteral",
        ]
