from django.db import models


class Section(models.Model):
    YEAR_LEVEL_CHOICES = (
        (1, "FIRST YEAR"),
        (2, "SECOND YEAR"),
        (3, "THIRD YEAR"),
        (4, "FOURTH YEAR"),
    )

    label = models.CharField(max_length=255)
    year_level = models.IntegerField(choices=YEAR_LEVEL_CHOICES, default=1)
    program = models.ForeignKey(
        "program.Program", null=True, blank=True, on_delete=models.SET_NULL
    )
    department = models.ForeignKey(
        "department.Department", null=True, blank=True, on_delete=models.SET_NULL
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "section"
        constraints = [
            models.UniqueConstraint(
                fields=["label", "year_level", "program", "department"],
                name="unique_section",
            )
        ]

    def __str__(self):
        return f"{self.year_level}{self.label} - {self.program.acronym if self.program else 'No Department'}"

    def soft_delete(self):
        self.is_active = False
        self.save()

    def save(self, *args, **kwargs):
        # Reactivate an existing section with matching label if inactive
        if self.pk is None:
            existing_section = Section.objects.filter(
                label=self.label, is_active=False
            ).first()
            if existing_section:
                existing_section.is_active = True
                existing_section.save()
                return

        super().save(*args, **kwargs)
