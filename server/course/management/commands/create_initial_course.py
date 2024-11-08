from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from django.utils import timezone
from django.db import transaction
from course.models import Course
from department.models import Department

from data.courses.ccs import CCS_COURSES
from data.courses.cbaa import CBAA_COURSES
from data.courses.chas import CHAS_COURSES
from data.courses.coed import COED_COURSES
from data.courses.coe import COE_COURSES


class Command(BaseCommand):
    help = "Create courses with initial data"

    def handle(self, *args, **kwargs):
        # Combine all course lists into one
        courses_data = (
            COED_COURSES + CCS_COURSES + CBAA_COURSES + CHAS_COURSES + COE_COURSES
        )

        # Store references to created courses
        course_mapping = {}

        with transaction.atomic():  # Ensures atomicity of the database operations
            # First pass: Create courses if they don't exist
            for course_data in courses_data:
                try:
                    # Check if the course already exists
                    if Course.objects.filter(
                        name=course_data["name"], code=course_data["code"]
                    ).exists():
                        self.stdout.write(
                            self.style.WARNING(
                                f"Course '{course_data['name']}' with code '{course_data['code']}' already exists. Skipping creation."
                            )
                        )
                        continue  # Skip this course if it exists

                    # Only set department if it exists in course_data
                    department = None
                    if "department_id" in course_data:
                        department = Department.objects.get(
                            id=course_data["department_id"]
                        )

                    # Parse created_at and updated_at with default fallback to timezone.now()
                    created_at = (
                        parse_datetime(course_data.get("created_at")) or timezone.now()
                    )
                    updated_at = (
                        parse_datetime(course_data.get("updated_at")) or timezone.now()
                    )

                    # Create the course
                    course = Course.objects.create(
                        name=course_data["name"],
                        code=course_data["code"],
                        category=course_data["category"],
                        department=department,  # Can be None if no department_id
                        lecture_unit=course_data.get("lec_units", 0),
                        lab_unit=course_data.get("lab_units", 0),
                        lecture_hours=course_data.get("lec_hours", 0),
                        lab_hours=course_data.get("lab_hours", 0),
                        need_masteral=course_data["need_masteral"],
                        is_active=course_data["is_active"],
                        created_at=created_at,
                        updated_at=updated_at,
                    )

                    # Store reference to the course by code for later use in pre/co-requisites
                    course_mapping[course_data["code"]] = course

                    self.stdout.write(
                        self.style.SUCCESS(f"Created course: {course.name}")
                    )

                except Department.DoesNotExist:
                    self.stdout.write(
                        self.style.ERROR(
                            f"Department with id {course_data.get('department_id')} does not exist for course '{course_data['name']}'."
                        )
                    )

            # Second pass: Set pre-requisites and co-requisites relationships
            for course_data in courses_data:
                course = course_mapping.get(course_data["code"])
                if not course:
                    continue

                # Handle pre-requisites
                if (
                    "pre_requisites" in course_data
                    and course_data["pre_requisites"] != "None"
                ):
                    pre_requisite_codes = course_data["pre_requisites"].split(", ")
                    for code in pre_requisite_codes:
                        pre_requisite = course_mapping.get(code)
                        if pre_requisite:
                            course.pre_requisites.add(pre_requisite)
                        else:
                            self.stdout.write(
                                self.style.ERROR(
                                    f"Pre-requisite course with code '{code}' not found for course '{course.name}'."
                                )
                            )

                # Handle co-requisites
                if (
                    "co_requisites" in course_data
                    and course_data["co_requisites"] != "None"
                ):
                    co_requisite_codes = course_data["co_requisites"].split(", ")
                    for code in co_requisite_codes:
                        co_requisite = course_mapping.get(code)
                        if co_requisite:
                            course.co_requisites.add(co_requisite)
                        else:
                            self.stdout.write(
                                self.style.ERROR(
                                    f"Co-requisite course with code '{code}' not found for course '{course.name}'."
                                )
                            )

                course.save()  # Save changes to the course

        self.stdout.write(self.style.SUCCESS("Courses import completed successfully!"))
