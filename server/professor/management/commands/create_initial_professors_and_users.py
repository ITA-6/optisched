from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth.hashers import make_password

from department.models import Department
from professor.models import Professor
from account.models import CustomUser
from data.professors import professors_data


class Command(BaseCommand):
    help = "Create dummy professor data and corresponding user accounts"

    def handle(self, *args, **kwargs):
        for prof_data in professors_data:
            # Fetch or create department
            department = Department.objects.get(id=prof_data["department_id"])

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
                    "created_at": prof_data["created_at"],
                    "updated_at": prof_data["updated_at"],
                },
            )

            if not created and not professor.is_active:
                professor.is_active = True
                professor.save()

            user, user_created = CustomUser.objects.get_or_create(
                email=prof_data["email"],
                defaults={
                    "username": prof_data["prof_id"],
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
