from django.db import models


class Constraint(models.Model):
    casual_units = models.IntegerField(default=18)
    part_time_units = models.IntegerField(default=10)
    full_time_units = models.IntegerField(default=21)
    start_time = models.TimeField()
    end_time = models.TimeField()
    vacant_hours = models.DecimalField(max_digits=5, decimal_places=2)
    pairing_day = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "constraint"

    def soft_delete(self):
        self.is_active = False
        self.save()
