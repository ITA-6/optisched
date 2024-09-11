from django.db import models
from django.utils import timezone


class Schedule(models.Model):
    course = models.ForeignKey(
        "course.Course", on_delete=models.CASCADE, null=True, blank=True
    )
    professor = models.ForeignKey(
        "professor.Professor", on_delete=models.CASCADE, null=True, blank=True
    )
    room = models.ForeignKey(
        "room.Room", on_delete=models.CASCADE, null=True, blank=True
    )
    section = models.ForeignKey(
        "section.Section", on_delete=models.CASCADE, null=True, blank=True
    )
    day_of_week = models.IntegerField(default=0)  # 0 = Monday, 6 = Sunday
    start_time = models.TimeField(default=timezone.now)
    end_time = models.TimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "schedule"

    def soft_delete(self):
        self.is_active = False
        self.save()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
