from django.db import models


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
        "program.Program", null=True, blank=True, on_delete=models.DO_NOTHING
    )
    department = models.ForeignKey(
        "department.Department", null=True, blank=True, on_delete=models.DO_NOTHING
    )
    courses = models.ManyToManyField("schedule.CourseSchedule", blank=True)
    section = models.ForeignKey(
        "section.Section", on_delete=models.DO_NOTHING, null=True, blank=True
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "schedule"
        ordering = ["-created_at"]

    def soft_delete(self):
        """Sets the schedule as inactive without deleting it."""
        self.is_active = False
        self.save()

    def __str__(self):
        return f"{self.section} - {self.get_semester_display()} {self.year_level}"


class CourseSchedule(models.Model):
    """
    CourseSchedule represents a specific course meeting time and place.
    This is linked to the Schedule model through a Many-to-Many relationship.
    """

    course = models.ForeignKey("course.Course", on_delete=models.CASCADE, blank=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    professor = models.ForeignKey(
        "professor.Professor", on_delete=models.DO_NOTHING, null=True, blank=True
    )
    lecture_time_range = models.ForeignKey(
        "schedule.TimeSlot",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
        related_name="lecture_time_schedule",
    )
    lab_time_range = models.ForeignKey(
        "schedule.TimeSlot",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
        related_name="lab_time_schedule",
    )
    lab_room = models.ForeignKey(
        "room.Room",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
        related_name="lab_room_schedules",
    )
    lecture_room = models.ForeignKey(
        "room.Room",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
        related_name="lecture_room_schedules",
    )

    class Meta:
        db_table = "course_schedule"

    def __str__(self):
        lecture_room_str = (
            f"Lecture Room: {self.lecture_room.number}"
            if self.lecture_room
            else "Lecture Room: Not Assigned"
        )
        lab_room_str = (
            f"Lab Room: {self.lab_room.number}"
            if self.lab_room
            else "Lab Room: Not Assigned"
        )

        lecture_timeslot_str = (
            f"{self.lecture_timeslot.all()}"
            if self.lecture_timeslot.exists()
            else "No Lecture Times"
        )
        lab_timeslot_str = (
            f"{self.lab_timeslot.all()}"
            if self.lab_timeslot.exists()
            else "No Lab Times"
        )

        return f"{self.course} - {lecture_room_str}, {lab_room_str}, Lecture Times: {lecture_timeslot_str}, Lab Times: {lab_timeslot_str}"


class TimeSlot(models.Model):
    """
    TimeSlot represents a specific block of time on a given day of the week.
    It can be used to manage scheduling conflicts more easily.
    """

    DAYS_OF_WEEK = [
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
    ]

    day_of_week = models.IntegerField(choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        db_table = "timeslot"
        unique_together = ("day_of_week", "start_time", "end_time")
        ordering = ["day_of_week", "start_time"]

    def __str__(self):
        day_name = dict(self.DAYS_OF_WEEK).get(self.day_of_week, "Unknown")
        return f"{day_name} {self.start_time} - {self.end_time}"
