from django.core.management.base import BaseCommand
from building.models import Building


class Command(BaseCommand):
    help = "Create initial building data"

    def handle(self, *args, **kwargs):
        buildings_data = [
            {"name": "PNC Main Building", "total_rooms": 60, "available_rooms": 60},
            {"name": "BCH", "total_rooms": 100, "available_rooms": 100},
            # {"name": "Nursing Building", "total_rooms": 20, "available_rooms": 20},
        ]

        for building_data in buildings_data:
            # Check if building already exists
            building, created = Building.objects.get_or_create(
                name=building_data["name"],
                defaults={
                    "total_rooms": building_data["total_rooms"],
                    "available_rooms": building_data["available_rooms"],
                    "is_active": True,  # Setting default to active
                },
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Building "{building.name}" created.')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Building "{building.name}" already exists.')
                )

        self.stdout.write(self.style.SUCCESS("Buildings creation completed."))
