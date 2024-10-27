from django.db import models
from django.utils import timezone


class Schedule(models.Model):
    SEMESTER_CHOICES = (
        ("FIRST_SEMESTER", "FIRST SEMESTER"),
        ("SECOND_SEMESTER", "SECOND SEMESTER"),
    )

    YEAR_LEVEL_CHOICES = (
        (1, "FIRST YEAR"),
        (2, "SECOND YEAR"),
        (3, "THIRD YEAR"),
        (4, "FOURTH YEAR"),
    )

    year_level = models.IntegerField(choices=YEAR_LEVEL_CHOICES, default=1)
    semester = models.CharField(
        max_length=25, choices=SEMESTER_CHOICES, default="FIRST_SEMESTER"
    )
    program = models.ForeignKey(
        "program.Program", null=True, blank=True, on_delete=models.SET_NULL
    )
    department = models.ForeignKey(
        "department.Department", null=True, blank=True, on_delete=models.SET_NULL
    )
    courses = models.ManyToManyField("course.Course", blank=True)
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
