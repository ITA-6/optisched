from django.db import models

from professor.models import Professor
from program.models import Program


class Section(models.Model):
    label = models.CharField(max_length=255)
    year_level = models.IntegerField()
    adviser = models.ForeignKey(
        Professor, on_delete=models.CASCADE, null=True, blank=True
    )
    program = models.ForeignKey(
        Program, on_delete=models.CASCADE, null=True, blank=True
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "section"

    def soft_delete(self):
        self.is_active = False
        self.save()

    def save(self, *args, **kwargs):
        if self.pk is None:
            existing_section = Section.objects.filter(
                label=self.label, is_active=False
            ).first()
            if existing_section:
                existing_section.is_active = True
                existing_section.save()
                return

        super().save(*args, **kwargs)
