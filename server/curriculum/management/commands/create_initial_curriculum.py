from django.core.management.base import BaseCommand
from department.models import Department
from program.models import Program
from course.models import Course
from curriculum.models import Curriculum

from data.curriculum.ccs.bsit import BSIT_CURRICULUM
from data.curriculum.ccs.bscs import BSCS_CURRICULUM
from data.curriculum.cbaa.bsa import BSA_CURRICULUM
from data.curriculum.chas.bsn import BSN_CURRICULUM
from data.curriculum.coe.bscpe import BSCPE_CURRICULUM
from data.curriculum.coe.bsece import BSECE_CURRICULUM
from data.curriculum.coe.bsie import BSIE_CURRICULUM


class Command(BaseCommand):
    help = "Create or update curriculum for each department and program"

    def handle(self, *args, **kwargs):
        curriculum_data_groups = {
            "ccs": BSIT_CURRICULUM + BSCS_CURRICULUM,
            "cbaa": BSA_CURRICULUM,
            "chas": BSN_CURRICULUM,
            "coe": BSCPE_CURRICULUM + BSECE_CURRICULUM + BSIE_CURRICULUM,
            "coed": [],
            "bsp": [],
        }

        for group_name, curriculums in curriculum_data_groups.items():
            for curriculum_data in curriculums:
                self.process_curriculum(curriculum_data)

    def process_curriculum(self, curriculum_data):
        try:
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
                return

            if not program:
                self.stdout.write(
                    self.style.ERROR(
                        f"Program with ID {curriculum_data['program']} not found. Skipping..."
                    )
                )
                return

            self.create_or_update_curriculum(
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

    def create_or_update_curriculum(
        self, department, program, year_level, semester, courses
    ):
        try:
            curriculum, created = Curriculum.objects.get_or_create(
                department=department,
                program=program,
                year_level=year_level,
                semester=semester,
            )

            if not created:
                curriculum.courses.clear()

            for course_data in courses:
                self.add_course_to_curriculum(curriculum, course_data)

            curriculum.save()

            message = "Created" if created else "Updated existing"
            self.stdout.write(
                self.style.SUCCESS(
                    f"{message} curriculum for {year_level} year, {semester}"
                )
            )

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {str(e)}"))

    def add_course_to_curriculum(self, curriculum, course_data):
        try:
            course = Course.objects.get(code=course_data["course"])
            curriculum.courses.add(course)
        except Course.DoesNotExist:
            self.stdout.write(
                self.style.ERROR(
                    f"Course with code {course_data['course']} does not exist. Skipping..."
                )
            )
