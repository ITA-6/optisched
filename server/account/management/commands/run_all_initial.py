from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    help = "Run all initial setup commands (admin, departments, professors, users, buildings)"

    def handle(self, *args, **kwargs):
        commands_to_run = [
            "create_initial_admin",
            "create_initial_department",
            "create_initial_professors_and_users",
            "create_initial_buildings",
            "create_initial_program",
            "create_initial_room",
            "create_initial_section",
            "create_initial_course",
            "create_initial_curriculum",
        ]

        for command in commands_to_run:
            self.stdout.write(self.style.NOTICE(f"Running {command}..."))
            try:
                call_command(command)
                self.stdout.write(self.style.SUCCESS(f"Successfully ran {command}."))
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"Error running {command}: {str(e)}")
                )

        self.stdout.write(self.style.SUCCESS("All commands executed."))
