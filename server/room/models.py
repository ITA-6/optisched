from django.db import models

from building.models import Building


class Room(models.Model):
    ROOM_CATEGORY = (
        ("LECTURE", "Lecture"),
        ("LABORATORY", "Laboratory"),
        ("BOTH", "Lecture & Category"),
    )

    number = models.IntegerField()
    floor = models.IntegerField()
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
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

    def soft_delete(self):
        self.is_active = False
        self.save()

    def save(self, *args, **kwargs):
        if self.pk is None:
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

        super().save(*args, **kwargs)
