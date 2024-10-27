from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from datetime import datetime


class Command(BaseCommand):
    help = "Create an initial superuser"

    user_id = 2222222
    birth_date = "2024-12-12"

    def handle(self, *args, **kwargs):
        User = get_user_model()
        if not User.objects.filter(email="admin@example.com").exists():
            User.objects.create_admin(
                user_id=self.user_id,
                username=str(self.user_id),
                first_name="Fernando",
                last_name="Pendon",
                password=self.birth_date,
                birth_date=datetime.strptime(self.birth_date, "%Y-%m-%d"),
                email="admin@example.com",
            )
            self.stdout.write(self.style.SUCCESS("Successfully created initial admin"))
        else:
            self.stdout.write(self.style.WARNING("admin already exists"))
