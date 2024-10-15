from django.core.management.base import BaseCommand

from department.models import Department


class Command(BaseCommand):
    help = "Create dummy department data"

    def handle(self, *args, **kwargs):
        departments = [
            {"name": "College of Computing Studies", "acronym": "CCS"},
            {"name": "College of Engineering", "acronym": "COE"},
            {
                "name": "College of Business, Accountancy and Administration",
                "acronym": "CBAA",
            },
            {"name": "College of Arts and Sciences", "acronym": "CAS"},
            {"name": "College of Education", "acronym": "COED"},
            {"name": "College of Health and Allied Sciences", "acronym": "CHAS"},
        ]

        for dept_data in departments:
            # Check if the department already exists (either active or inactive)
            department = Department.objects.filter(name=dept_data["name"]).first()

            if department:
                if department.is_active:
                    self.stdout.write(
                        self.style.WARNING(
                            f"Department {dept_data['name']} already exists and is active."
                        )
                    )
                else:
                    department.is_active = True
                    department.acronym = dept_data[
                        "acronym"
                    ]  # Update acronym in case it's different
                    department.save()
                    self.stdout.write(
                        self.style.SUCCESS(
                            f"Reactivated Department {dept_data['name']}."
                        )
                    )
            else:
                # Create a new department
                Department.objects.create(
                    name=dept_data["name"], acronym=dept_data["acronym"]
                )
                self.stdout.write(
                    self.style.SUCCESS(f"Created Department {dept_data['name']}.")
                )
