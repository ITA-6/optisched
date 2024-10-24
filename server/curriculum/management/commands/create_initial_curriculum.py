from django.core.management.base import BaseCommand
from department.models import Department
from program.models import Program
from course.models import Course
from curriculum.models import Curriculum

# Define your curriculum data here or import from a separate file if needed
from data.curriculum.ccs.bsit import BSIT_CURRICULUM


class Command(BaseCommand):
    help = "Create curriculum for each department and program"

    def handle(self, *args, **kwargs):
        for curriculum_data in BSIT_CURRICULUM:
            try:
                # Retrieve the program and department from the curriculum data
                department = Department.objects.filter(
                    id=curriculum_data["department"]
                ).first()
                program = Program.objects.filter(id=curriculum_data["program"]).first()

                if not department:
                    self.stdout.write(
                        self.style.ERROR(
                            f"Department with ID {curriculum_data['department']} not found. Skipping..."
                        )
                    )
                    continue

                if not program:
                    self.stdout.write(
                        self.style.ERROR(
                            f"Program with ID {curriculum_data['program']} not found. Skipping..."
                        )
                    )
                    continue

                # Create or update curriculum for the semester and year level
                self.create_curriculum(
                    department,
                    program,
                    curriculum_data["year_level"],
                    curriculum_data["semester"],
                    curriculum_data["courses"],
                )

                self.stdout.write(
                    self.style.SUCCESS(
                        f"Curriculum created/updated for department {department.acronym}, program {program.acronym}"
                    )
                )

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error occurred: {str(e)}"))

    def create_curriculum(self, department, program, year_level, semester, courses):
        try:
            # Create or get the curriculum record
            curriculum, created = Curriculum.objects.get_or_create(
                department=department,
                program=program,
                year_level=year_level,
                semester=semester,
            )

            # Clear the courses if the curriculum already exists (optional)
            if not created:
                curriculum.courses.clear()

            # Add courses to the curriculum by course code
            for course_data in courses:
                try:
                    course = Course.objects.get(
                        code=course_data["course"]
                    )  # Get the course by code
                    curriculum.courses.add(course)
                except Course.DoesNotExist:
                    self.stdout.write(
                        self.style.ERROR(
                            f"Course with code {course_data['course']} does not exist. Skipping..."
                        )
                    )

            curriculum.save()

            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created curriculum for {year_level} year, {semester}"
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f"Updated existing curriculum for {year_level} year, {semester}"
                    )
                )

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {str(e)}"))
