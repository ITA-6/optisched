# section/management/commands/assign_advisers.py

from django.core.management.base import BaseCommand
from section.models import Section
from professor.models import Professor
from django.db import transaction


class Command(BaseCommand):
    help = "Assign advisers to each section based on department and availability."

    def handle(self, *args, **kwargs):
        # Fetch sections that need advisers
        sections_without_advisers = Section.objects.filter(
            adviser__isnull=True, is_active=True
        ).distinct()

        if not sections_without_advisers.exists():
            self.stdout.write(
                self.style.SUCCESS("All sections already have advisers assigned.")
            )

        # Loop through each section to assign an adviser
        for section in sections_without_advisers:
            adviser = self.select_adviser_for_section(section)

            if adviser:
                # Assign the adviser to the section with a transaction to ensure consistency
                with transaction.atomic():
                    adviser.advisee = section
                    adviser.save()

                self.stdout.write(
                    self.style.SUCCESS(
                        f"Assigned {adviser.first_name} {adviser.last_name} as adviser for section {section.label}, Year {section.year_level}."
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f"No available adviser found for section {section.label}, Year {section.year_level} in department {section.department.name}."
                    )
                )

        self.stdout.write(
            self.style.SUCCESS("Completed assigning advisers to sections.")
        )

    def select_adviser_for_section(self, section):
        """Select an available adviser for the section based on department only."""
        # Filter professors within the same department who are eligible and currently not advising any section
        eligible_professors = Professor.objects.filter(
            department=section.department,  # Adviser must be from the same department
            is_active=True,
            advisee__isnull=True,  # Adviser should not already have an advisee
        ).order_by("last_name")  # Order by last name for predictable assignment

        return eligible_professors.first() if eligible_professors.exists() else None
