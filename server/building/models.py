from django.db import models


class Building(models.Model):
    name = models.CharField(max_length=255, unique=True)
    total_rooms = models.IntegerField(default=0)
    available_rooms = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "building"

    def soft_delete(self):
        self.is_active = False
        self.save()

    def save(self, *args, **kwargs):
        if self.pk is None:
            existing_building = Building.objects.filter(
                name=self.name, is_active=False
            ).first()
            if existing_building:
                existing_building.is_active = True
                existing_building.save()
                return

        super().save(*args, **kwargs)
