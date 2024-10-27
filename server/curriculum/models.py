from django.db import models


class Curriculum(models.Model):
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

    class Meta:
        db_table = "curriculum"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
