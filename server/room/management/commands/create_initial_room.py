from django.core.management.base import BaseCommand
from building.models import Building
from room.models import Room
from data.rooms.main import main_rooms
from data.rooms.bch import bch_rooms
from data.rooms.nb import nb_rooms


class Command(BaseCommand):
    help = "Create rooms from predefined room data and update the available rooms in each building."

    def handle(self, *args, **kwargs):
        ROOM_CATEGORIES = ["LECTURE", "LABORATORY"]

        # Fetch the buildings from the database to associate with the rooms
        buildings = Building.objects.filter(is_active=True, available_rooms__gt=0)

        if not buildings.exists():
            self.stdout.write(
                self.style.ERROR(
                    "No active buildings with available rooms found. Please create or update buildings first."
                )
            )
            return

        # Combine all room data from the imported files
        all_rooms_data = main_rooms + bch_rooms + nb_rooms

        # Iterate over all predefined rooms to create them in their respective buildings
        for room_data in all_rooms_data:
            building_id = room_data["building"]
            building = buildings.filter(
                id=building_id, is_active=True, available_rooms__gt=0
            ).first()

            if not building:
                self.stdout.write(
                    self.style.WARNING(
                        f"Building with ID {building_id} is either inactive or has no available rooms."
                    )
                )
                continue

            # Ensure room category is valid
            room_category = room_data["room_category"]
            if room_category not in ROOM_CATEGORIES:
                room_category = "LECTURE"  # Default to LECTURE if invalid

            # Create room or notify if it exists
            room, created = Room.objects.get_or_create(
                number=room_data["number"],
                floor=room_data["floor"],
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
                        f"Created Room {room.number} in {building.name}, Floor {room_data['floor']}, "
                        f"Category {room_category}. Remaining available rooms in {building.name}: {building.available_rooms}"
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f"Room {room.number} on Floor {room_data['floor']} already exists in {building.name}."
                    )
                )
