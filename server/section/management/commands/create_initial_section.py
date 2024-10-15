from django.core.management.base import BaseCommand

import random

from department.models import Department
from program.models import Program
from section.models import Section


class Command(BaseCommand):
    help = (
        "Create 3 sections for each year level and department, adviser is set to null"
    )

    def handle(self, *args, **kwargs):
        NUM_SECTIONS = 3  # Number of sections to create per year level per department
        YEAR_LEVELS = [1, 2, 3, 4]  # Year levels

        # Fetch all active departments
        departments = Department.objects.filter(is_active=True)

        if not departments.exists():
            self.stdout.write(
                self.style.ERROR(
                    "No active departments found. Please create departments first."
                )
            )
            return

        for department in departments:
            # Fetch programs under each department
            programs = Program.objects.filter(department=department, is_active=True)
            if not programs.exists():
                self.stdout.write(
                    self.style.WARNING(
                        f"No active programs found for department {department.name}. Skipping department."
                    )
                )
                continue

            for year_level in YEAR_LEVELS:
                for section_num in range(1, NUM_SECTIONS + 1):
                    # Create a label for the section, e.g., "1-A", "2-B", etc.
                    section_label = f"{year_level}-{chr(64 + section_num)}"  # A, B, C
                    program = random.choice(programs)  # Randomly select a program

                    section, created = Section.objects.get_or_create(
                        label=section_label,
                        year_level=year_level,
                        program=program,
                        defaults={
                            "adviser": None,  # Adviser is set to null
                            "is_active": True,
                        },
                    )

                    if created:
                        self.stdout.write(
                            self.style.SUCCESS(
                                f"Created Section {section_label} for {department.name}, Year Level {year_level}, Program {program.name}"
                            )
                        )
                    else:
                        self.stdout.write(
                            self.style.WARNING(
                                f"Section {section_label} already exists for {department.name}, Year Level {year_level}"
                            )
                        )
