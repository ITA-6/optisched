from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Create an initial superuser"

    def handle(self, *args, **kwargs):
        User = get_user_model()
        if not User.objects.filter(email="admin@example.com").exists():
            User.objects.create_admin(
                username="admin",
                password="admin",
                email="admin@example.com",
            )
            self.stdout.write(self.style.SUCCESS("Successfully created initial admin"))
        else:
            self.stdout.write(self.style.WARNING("admin already exists"))
