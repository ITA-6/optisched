from rest_framework import serializers
from curriculum.models import Curriculum
from course.serializers import CourseSerializer
from course.models import Course


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


class CreateCurriculumSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(), many=True
    )
    year_level = serializers.SerializerMethodField()
    semester = serializers.SerializerMethodField()

    class Meta:
        model = Curriculum
        fields = ["year_level", "semester", "courses", "program", "department"]

    def get_year_level(self, obj):
        return obj.get_year_level_display()

    def get_semester(self, obj):
        return obj.get_semester_display()

    def validate(self, data):
        program = data.get("program")
        year_level = data.get("year_level")
        semester = data.get("semester")
        courses = data.get("courses", [])

        # Extract the IDs of the courses from the Course objects
        course_ids = [course.id for course in courses]

        # Check for duplicate courses within the same curriculum
        if Curriculum.objects.filter(
            program=program,
            year_level=year_level,
            semester=semester,
            courses__in=course_ids,
        ).exists():
            raise serializers.ValidationError(
                "One or more courses already exist in this curriculum."
            )

        # Check for an exact duplicate of curriculum (same program, year level, semester, and identical courses list)
        existing_curriculums = Curriculum.objects.filter(
            program=program, year_level=year_level, semester=semester
        ).prefetch_related("courses")

        for curriculum in existing_curriculums:
            existing_course_ids = [course.id for course in curriculum.courses.all()]
            if sorted(existing_course_ids) == sorted(course_ids):
                raise serializers.ValidationError(
                    "A curriculum with this program, year level, semester, and exact courses already exists."
                )

        return data
