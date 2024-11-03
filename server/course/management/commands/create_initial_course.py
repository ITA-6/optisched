from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from course.models import Course
from department.models import Department

from data.courses.ccs import CCS_COURSES
from data.courses.cbaa import CBAA_COURSES
from data.courses.chas import CHAS_COURSES
from data.courses.general import GENERAL_COURSES
from data.courses.coe import COE_COURSES


class Command(BaseCommand):
    help = "Create courses with initial data"

    def handle(self, *args, **kwargs):
        # Combine all course lists into one
        courses_data = (
            GENERAL_COURSES + CCS_COURSES
            # + CBAA_COURSES + CHAS_COURSES + COE_COURSES
        )

        # Store references to created courses
        course_mapping = {}

        # First pass: Create courses
        for course_data in courses_data:
            try:
                department = None
                # Only set department if it exists in course_data
                if "department_id" in course_data:
                    department = Department.objects.get(id=course_data["department_id"])

                # Parse the created_at and updated_at fields from the data
                created_at = parse_datetime(course_data.get("created_at"))
                updated_at = parse_datetime(course_data.get("updated_at"))

                # Calculate lecture and lab units/hours
                lecture_units = course_data.get("lec_units", 0)
                lab_units = course_data.get("lab_units", 0)
                lecture_hours = course_data.get("lec_hours", 0)
                lab_hours = course_data.get("lab_hours", 0)

                # Create or get the course
                course, created = Course.objects.get_or_create(
                    name=course_data["name"],
                    code=course_data["code"],
                    defaults={
                        "category": course_data["category"],
                        "department": department,  # Can be None if no department_id
                        "lecture_unit": lecture_units,
                        "lab_unit": lab_units,
                        "lecture_hours": lecture_hours,
                        "lab_hours": lab_hours,
                        "need_masteral": course_data["need_masteral"],
                        "is_active": course_data["is_active"],
                        "created_at": created_at,
                        "updated_at": updated_at,
                    },
                )

                # Store reference to the course by code for later use in pre/co-requisites
                course_mapping[course_data["code"]] = course

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
                                f"Pre-requisite course with code {code} not found."
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
                                f"Co-requisite course with code {code} not found."
                            )
                        )

            course.save()  # Save changes to the course

        self.stdout.write(self.style.SUCCESS("Courses import completed successfully!"))
