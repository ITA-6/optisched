from django.db import models


class Constraint(models.Model):
    # Toggle constraints
    transition_time = models.BooleanField(
        default=True, help_text="Minimum transition time between rooms."
    )
    wait_time = models.BooleanField(
        default=True, help_text="Maximum wait time between courses."
    )
    teaching_load = models.BooleanField(
        default=True,
        help_text="Professors should not teach two courses simultaneously.",
    )
    daily_teaching_limit = models.BooleanField(
        default=True, help_text="Limit for daily teaching hours per professor."
    )
    classroom_capacity = models.BooleanField(
        default=True, help_text="Classroom capacity limit enforcement."
    )
    room_occupancy = models.BooleanField(
        default=True, help_text="Ensure rooms are not left empty for long periods."
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

    def __str__(self):
        return "Constraint Settings"

    class Meta:
        verbose_name = "Constraint"
        verbose_name_plural = "Constraints"
