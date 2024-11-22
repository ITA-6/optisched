from django.db import models

from datetime import timedelta


class Constraint(models.Model):
    SEMESTER_CHOICES = (
        ("FIRST_SEMESTER", "FIRST SEMESTER"),
        ("SECOND_SEMESTER", "SECOND SEMESTER"),
    )

    transition_time = models.DurationField(
        default=timedelta(minutes=30),
        help_text="Transition time in minutes for sections.",
    )
    wait_time = models.DurationField(
        default=timedelta(hours=6),
        help_text="Maximum wait time (hours) between courses.",
    )
    daily_teaching_limit = models.DurationField(
        default=timedelta(hours=6),
        help_text="Daily teaching limit (hours) for professors.",
    )
    laboratory_sessions = models.BooleanField(
        default=True,
        help_text="Ensure lab sessions are in the same building or area as the next session.",
    )

    # Employment workload fields
    permanent_workload = models.PositiveIntegerField(
        default=21, help_text="Workload for permanent employment positions."
    )
    temporary_workload = models.PositiveIntegerField(
        default=24, help_text="Workload for temporary employment positions."
    )
    part_time_workload = models.PositiveIntegerField(
        default=12, help_text="Workload for part-time employment positions."
    )

    # Schedule fields
    start_time = models.TimeField(default="08:00", help_text="Schedule start time.")
    end_time = models.TimeField(default="18:00", help_text="Schedule end time.")

    semester = models.CharField(
        max_length=25, choices=SEMESTER_CHOICES, default="FIRST_SEMESTER"
    )

    def __str__(self):
        return "Constraint Settings"

    class Meta:
        verbose_name = "Constraint"
        verbose_name_plural = "Constraints"
