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
from data.professors.chas import CHAS_PROFESSORS


class Command(BaseCommand):
    help = "Create dummy professor data and corresponding user accounts"

    def handle(self, *args, **kwargs):
        # Define datasets to process
        professor_datasets = [
            {"name": "CCS", "data": CCS_PROFESSORS},
            {"name": "COE", "data": COE_PROFESSORS},
            {"name": "COED", "data": COED_PROFESSORS},
            {"name": "CHAS", "data": CHAS_PROFESSORS},
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

            # Check if professor exists by email to avoid duplicates
            professor = Professor.objects.filter(email=prof_data["email"]).first()
            if professor:
                professor.prof_id = prof_data["prof_id"]
                professor.first_name = prof_data["first_name"]
                professor.last_name = prof_data["last_name"]
                professor.middle_name = prof_data["middle_name"]
                professor.employment_status = prof_data["employment_status"]
                professor.has_masteral = prof_data["has_masteral"]
                professor.department = department
                professor.required_units = prof_data["required_units"]
                professor.current_units = prof_data["current_units"]
                professor.birth_date = prof_data["birth_date"]
                professor.gender = prof_data["gender"]
                professor.is_active = prof_data["is_active"]
                professor.updated_at = timezone.now()
                professor.save()
                professor_created = False
            else:
                professor = Professor.objects.create(
                    prof_id=prof_data["prof_id"],
                    first_name=prof_data["first_name"],
                    last_name=prof_data["last_name"],
                    middle_name=prof_data["middle_name"],
                    employment_status=prof_data["employment_status"],
                    has_masteral=prof_data["has_masteral"],
                    department=department,
                    required_units=prof_data["required_units"],
                    current_units=prof_data["current_units"],
                    birth_date=prof_data["birth_date"],
                    email=prof_data["email"],
                    gender=prof_data["gender"],
                    is_active=prof_data["is_active"],
                    created_at=timezone.now(),
                    updated_at=timezone.now(),
                )
                professor_created = True

            # Create or update corresponding user account
            user = CustomUser.objects.filter(email=prof_data["email"]).first()
            if user:
                user.username = prof_data["prof_id"]
                user.user_id = prof_data["prof_id"]
                user.password = make_password(str(prof_data["birth_date"]))
                user.professor = professor
                user.first_name = prof_data["first_name"]
                user.last_name = prof_data["last_name"]
                user.middle_name = prof_data["middle_name"]
                user.birth_date = prof_data["birth_date"]
                user.department = department
                user.user_type = CustomUser.DEFAULT_USER[0]
                user.is_active = prof_data["is_active"]
                user.updated_at = timezone.now()
                user.save()
                user_created = False
            else:
                user = CustomUser.objects.create(
                    email=prof_data["email"],
                    username=prof_data["prof_id"],
                    user_id=prof_data["prof_id"],
                    password=make_password(str(prof_data["birth_date"])),
                    professor=professor,
                    first_name=prof_data["first_name"],
                    last_name=prof_data["last_name"],
                    middle_name=prof_data["middle_name"],
                    birth_date=prof_data["birth_date"],
                    department=department,
                    user_type=CustomUser.DEFAULT_USER[0],
                    is_active=prof_data["is_active"],
                    date_joined=timezone.now(),
                    created_at=timezone.now(),
                    updated_at=timezone.now(),
                )
                user_created = True

            # Output to the console
            if professor_created and user_created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created Professor {prof_data['first_name']} {prof_data['last_name']} and corresponding user."
                    )
                )
            elif professor_created:
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
                        f"Professor {prof_data['first_name']} {prof_data['last_name']} and user already exist and were updated."
                    )
                )
