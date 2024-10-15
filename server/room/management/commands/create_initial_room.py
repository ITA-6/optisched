from django.core.management.base import BaseCommand

import random

from building.models import Building
from room.models import Room


class Command(BaseCommand):
    help = "Create 50 rooms with random data and update the available rooms in each building"

    def handle(self, *args, **kwargs):
        ROOM_CATEGORIES = ["LECTURE", "LABORATORY", "BOTH"]

        # Fetch the buildings from the database to associate with the rooms
        buildings = Building.objects.filter(is_active=True, available_rooms__gt=0)

        if not buildings.exists():
            self.stdout.write(
                self.style.ERROR(
                    "No active buildings with available rooms found. Please create or update buildings first."
                )
            )
            return

        # Create 50 rooms, distributed among available buildings and floors
        for i in range(1, 101):
            building = random.choice(buildings)  # Randomly choose a building

            if building.available_rooms <= 0:
                self.stdout.write(
                    self.style.WARNING(
                        f"Building {building.name} has no available rooms."
                    )
                )
                continue

            floor = random.randint(1, 5)  # Randomly choose a floor (1 to 5)
            room_category = random.choice(
                ROOM_CATEGORIES
            )  # Randomly choose room category

            room, created = Room.objects.get_or_create(
                number=i,  # Room number from 1 to 50
                floor=floor,
                building=building,
                defaults={
                    "room_category": room_category,
                    "is_active": True,
                },
            )

            if created:
                # Decrease the available rooms for the building
                building.available_rooms -= 1
                building.save()

                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created Room {room.number} in {building.name}, Floor {floor}, Category {room_category}. "
                        f"Remaining available rooms in {building.name}: {building.available_rooms}"
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f"Room {room.number} already exists.")
                )
