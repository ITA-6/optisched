from django.core.management.base import BaseCommand
from course.models import Course
from department.models import Department
from django.utils.dateparse import parse_datetime
from data.courses import (
    GENERAL_COURSES,
    BSA_COURSES,
    BSN_COURSES,
    BSP_COURSES,
    BSCE_COURSES,
    BSCS_COURSES,
)


class Command(BaseCommand):
    help = "Create courses with initial data"

    def handle(self, *args, **kwargs):
        # Combine all course lists into one
        courses_data = (
            GENERAL_COURSES
            + BSA_COURSES
            + BSN_COURSES
            + BSP_COURSES
            + BSCE_COURSES
            + BSCS_COURSES
        )

        # Iterate over the course data and create courses
        for course_data in courses_data:
            try:
                department = None
                # Only set department if it exists in course_data
                if "department_id" in course_data:
                    department = Department.objects.get(id=course_data["department_id"])

                # Parse the created_at and updated_at fields from the data
                created_at = parse_datetime(course_data.get("created_at"))
                updated_at = parse_datetime(course_data.get("updated_at"))

                # Create or get the course
                course, created = Course.objects.get_or_create(
                    name=course_data["name"],
                    code=course_data["code"],
                    defaults={
                        "category": course_data["category"],
                        "department": department,  # Can be None if no department_id
                        "total_units": course_data["total_units"],
                        "total_hours": course_data["total_hours"],
                        "need_masteral": course_data["need_masteral"],
                        "is_active": course_data["is_active"],
                        "created_at": created_at,
                        "updated_at": updated_at,
                    },
                )
                if created:
                    self.stdout.write(
                        self.style.SUCCESS(f"Created course: {course.name}")
                    )
                else:
                    self.stdout.write(
                        self.style.WARNING(f"Course already exists: {course.name}")
                    )

            except Department.DoesNotExist:
                self.stdout.write(
                    self.style.ERROR(
                        f"Department with id {course_data.get('department_id')} does not exist."
                    )
                )
