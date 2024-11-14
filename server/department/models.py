from django.db import models
from django.core.exceptions import ValidationError


class Department(models.Model):
    name = models.CharField(max_length=255, unique=True)
    acronym = models.CharField(max_length=10, unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "department"
        ordering = ["-created_at"]

    def soft_delete(self):
        self.is_active = False
        self.save()

    def save(self, *args, **kwargs):
        if self.pk is None:
            existing_department = Department.objects.filter(
                name=self.name, is_active=False
            ).first()
            if existing_department:
                existing_department.is_active = True
                existing_department.save()
                return existing_department

        return super().save(*args, **kwargs)

    def clean(self):
        if not self.name:
            raise ValidationError("Name must not be empty.")

        if not self.acronym:
            raise ValidationError("Acronym must not be empty.")

    def __str__(self):
        return self.name
