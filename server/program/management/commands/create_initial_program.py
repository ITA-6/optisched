from django.core.management.base import BaseCommand

from data.programs import programs_data
from department.models import Department
from program.models import Program


class Command(BaseCommand):
    help = "Create initial program data"

    def handle(self, *args, **kwargs):
        for program_data in programs_data:
            department = Department.objects.get(id=program_data["department_id"])

            program, created = Program.objects.get_or_create(
                name=program_data["name"],
                department=department,
                defaults={
                    "acronym": program_data["acronym"],
                    "is_active": True,
                },
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(f"Created program {program_data['name']}")
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f"Program {program_data['name']} already exists")
                )
