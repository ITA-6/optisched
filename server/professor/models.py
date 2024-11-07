from django.db import models
from django.utils import timezone


class Professor(models.Model):
    EMPLOYMENT_STATUS_CHOICES = (
        ("CASUAL", "Casual"),
        ("PART_TIME", "Part-time"),
        ("PERMANENT", "Permanent"),
    )

    GENDER_CHOICES = [
        ("M", "Male"),
        ("F", "Female"),
        ("O", "Other"),
    ]

    HAS_MASTERAL_CHOICES = [("Y", "Yes"), ("N", "No")]

    prof_id = models.BigIntegerField(default=0, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255)
    employment_status = models.CharField(
        max_length=25, choices=EMPLOYMENT_STATUS_CHOICES
    )
    has_masteral = models.CharField(
        max_length=3, choices=HAS_MASTERAL_CHOICES, default="Y"
    )
    department = models.ForeignKey("department.Department", on_delete=models.CASCADE)
    required_units = models.IntegerField(default=0, null=True)
    current_units = models.IntegerField(default=0, null=True)
    handled_schedule = models.ManyToManyField(
        "schedule.Schedule", blank=True, related_name="professors"
    )
    birth_date = models.DateField(default=timezone.now)
    email = models.EmailField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default="O")
    advisee = models.OneToOneField(
        "section.Section",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="adviser",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "professor"

    def soft_delete(self):
        self.is_active = False
        self.save()

    def save(self, *args, **kwargs):
        # Reactivate an existing professor with matching name if inactive
        if self.pk is None:
            existing_professor = Professor.objects.filter(
                first_name=self.first_name, last_name=self.last_name, is_active=False
            ).first()
            if existing_professor:
                existing_professor.is_active = True
                existing_professor.save()
                return

        super().save(*args, **kwargs)
