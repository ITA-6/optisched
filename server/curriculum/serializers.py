from rest_framework import serializers
from curriculum.models import Curriculum
from course.serializers import CourseSerializer


class CurriculumSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True)
    year_level = serializers.SerializerMethodField()
    semester = serializers.SerializerMethodField()

    class Meta:
        model = Curriculum
        fields = ["year_level", "semester", "courses"]

    def get_year_level(self, obj):
        # Use Django's built-in method to get the display value of the year_level choice
        return obj.get_year_level_display()

    def get_semester(self, obj):
        # Use Django's built-in method to get the display value of the semester choice
        return obj.get_semester_display()
