from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth.hashers import make_password

from department.models import Department
from professor.models import Professor
from account.models import CustomUser

# Import datasets
from data.professors.ccs import CCS_PROFESSORS
from data.professors.coe import COE_PROFESSORS
from data.professors.coed import COED_PROFESSORS


class Command(BaseCommand):
    help = "Create dummy professor data and corresponding user accounts"

    def handle(self, *args, **kwargs):
        # Define datasets to process
        professor_datasets = [
            {"name": "CCS", "data": CCS_PROFESSORS},
            {"name": "COE", "data": COE_PROFESSORS},
            {"name": "COED", "data": COED_PROFESSORS},
        ]

        # Process each dataset
        for dataset in professor_datasets:
            self.create_professors_from_data(dataset["name"], dataset["data"])

        self.stdout.write(
            self.style.SUCCESS("Completed professor and user account creation.")
        )

    def create_professors_from_data(self, department_name, professors_data):
        """Create or update professors and corresponding user accounts."""
        self.stdout.write(
            self.style.NOTICE(f"Processing professors for {department_name}...")
        )

        for prof_data in professors_data:
            try:
                # Fetch or raise an error if department does not exist
                department = Department.objects.get(id=prof_data["department_id"])
            except Department.DoesNotExist:
                self.stdout.write(
                    self.style.ERROR(
                        f"Department with ID {prof_data['department_id']} not found for professor {prof_data['first_name']} {prof_data['last_name']}. Skipping."
                    )
                )
                continue

            # Create or reactivate professor
            professor, created = Professor.objects.get_or_create(
                prof_id=prof_data["prof_id"],
                defaults={
                    "first_name": prof_data["first_name"],
                    "last_name": prof_data["last_name"],
                    "middle_name": prof_data["middle_name"],
                    "employment_status": prof_data["employment_status"],
                    "has_masteral": prof_data["has_masteral"],
                    "department": department,
                    "required_units": prof_data["required_units"],
                    "current_units": prof_data["current_units"],
                    "birth_date": prof_data["birth_date"],
                    "email": prof_data["email"],
                    "gender": prof_data["gender"],
                    "is_active": prof_data["is_active"],
                    "created_at": prof_data.get("created_at", timezone.now()),
                    "updated_at": prof_data.get("updated_at", timezone.now()),
                },
            )

            # Reactivate professor if they already existed but were inactive
            if not created and not professor.is_active:
                professor.is_active = True
                professor.save()

            # Create or reactivate corresponding user account
            user, user_created = CustomUser.objects.get_or_create(
                email=prof_data["email"],
                defaults={
                    "username": prof_data["prof_id"],
                    "user_id": prof_data[
                        "prof_id"
                    ],  # Assigning the unique user_id here
                    "password": make_password(str(prof_data["birth_date"])),
                    "professor": professor,
                    "first_name": prof_data["first_name"],
                    "last_name": prof_data["last_name"],
                    "middle_name": prof_data["middle_name"],
                    "birth_date": prof_data["birth_date"],
                    "department": department,
                    "user_type": CustomUser.DEFAULT_USER[0],
                    "is_active": prof_data["is_active"],
                    "date_joined": timezone.now(),
                    "created_at": timezone.now(),
                    "updated_at": timezone.now(),
                },
            )

            # Reactivate user if they already existed but were inactive
            if not user_created and not user.is_active:
                user.is_active = True
                user.save()

            # Output to the console
            if created and user_created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created Professor {prof_data['first_name']} {prof_data['last_name']} and corresponding user."
                    )
                )
            elif created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created Professor {prof_data['first_name']} {prof_data['last_name']}."
                    )
                )
            elif user_created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created user for Professor {prof_data['first_name']} {prof_data['last_name']}."
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f"Professor {prof_data['first_name']} {prof_data['last_name']} and user already exist and were reactivated."
                    )
                )
