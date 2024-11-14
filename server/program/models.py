from django.db import models


class Program(models.Model):
    name = models.CharField(max_length=255, unique=True)
    department = models.ForeignKey("department.Department", on_delete=models.CASCADE)
    acronym = models.CharField(max_length=10, null=True, blank=True, unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "program"
        ordering = ["-created_at"]

    def soft_delete(self):
        self.is_active = False
        self.save()

    def save(self, *args, **kwargs):
        if self.pk is None:
            existing_program = Program.objects.filter(
                name=self.name, is_active=False
            ).first()
            if existing_program:
                existing_program.is_active = True
                existing_program.save()
                return

        super().save(*args, **kwargs)
