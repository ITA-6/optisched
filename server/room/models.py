from django.db import models


class Room(models.Model):
    ROOM_CATEGORY = (
        ("LECTURE", "Lecture"),
        ("LABORATORY", "Laboratory"),
    )

    number = models.IntegerField()
    floor = models.IntegerField()
    building = models.ForeignKey("building.Building", on_delete=models.CASCADE)
    room_category = models.CharField(
        max_length=25,
        choices=ROOM_CATEGORY,
        default="LECTURE",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "room"
        constraints = [
            models.UniqueConstraint(
                fields=["number", "floor", "building"],
                name="unique_room_number_floor_per_building",
            )
        ]

    def soft_delete(self):
        self.is_active = False
        self.save()

    def save(self, *args, **kwargs):
        # Check for existing inactive room to reactivate
        if self.pk is None:
            if self.building.available_rooms <= 0:
                raise ValueError("No available rooms in the building.")

            existing_room = Room.objects.filter(
                number=self.number,
                floor=self.floor,
                building=self.building,
                is_active=False,
            ).first()

            if existing_room:
                existing_room.is_active = True
                existing_room.save()
                return

            # Decrement available rooms in the building
            self.building.decrement_available_rooms()

        super().save(*args, **kwargs)
