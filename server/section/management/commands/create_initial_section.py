# section/management/commands/create_sections.py

from django.core.management.base import BaseCommand
from section.models import Section
from program.models import Program
from department.models import Department

# Import multiple datasets
from data.sections.ccs.bsit import BSIT_SECTIONS
from data.sections.ccs.bscs import BSCS_SECTIONS
from data.sections.coe.bscpe import BSCPE_SECTIONS
from data.sections.coe.bsece import BSECE_SECTIONS
from data.sections.coe.bsie import BSIE_SECTIONS


class Command(BaseCommand):
    help = (
        "Create sections based on predefined data for BSIT, BSCS, and other programs."
    )

    def handle(self, *args, **kwargs):
        # Define the datasets to be processed
        section_datasets = [
            {"name": "BSIT", "data": BSIT_SECTIONS},
            {"name": "BSCS", "data": BSCS_SECTIONS},
            {"name": "BSCPE", "data": BSCPE_SECTIONS},
            {"name": "BSECE", "data": BSECE_SECTIONS},
            {"name": "BSIE", "data": BSIE_SECTIONS},
            # Add more datasets here as needed
        ]

        # Process each dataset
        for dataset in section_datasets:
            self.create_sections_from_data(dataset["name"], dataset["data"])

        self.stdout.write(
            self.style.SUCCESS("Completed section creation for all programs.")
        )

    def create_sections_from_data(self, program_name, section_data_list):
        """Create or update sections based on provided data."""
        self.stdout.write(
            self.style.NOTICE(f"Processing sections for {program_name}...")
        )

        for section_data in section_data_list:
            label = section_data["label"]
            year_level = section_data["year_level"]
            department_id = section_data["department"]
            program_id = section_data["program"]

            # Fetch the related Department and Program objects
            department = Department.objects.filter(
                id=department_id, is_active=True
            ).first()
            program = Program.objects.filter(id=program_id, is_active=True).first()

            if not department or not program:
                self.stdout.write(
                    self.style.ERROR(
                        f"Department or program not found or inactive for Section {label}, Year {year_level}. Skipping."
                    )
                )
                continue

            # Check if a section with the same label, year level, department, and program already exists
            section, created = Section.objects.get_or_create(
                label=label,
                year_level=year_level,
                department=department,
                program=program,
                defaults={
                    "is_active": True,
                },
            )

            # Handle the case where the section exists but is inactive
            if not created and not section.is_active:
                section.is_active = True
                section.save()
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Reactivated Section {label}, Year Level {year_level} in Program {program.name}."
                    )
                )
            elif created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created Section {label}, Year Level {year_level} in Program {program.name}."
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f"Section {label}, Year Level {year_level} already exists and is active."
                    )
                )
