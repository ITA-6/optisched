from django.db import models


class Course(models.Model):
    COURSE_CATEGORY = (
        ("LECTURE", "Lecture"),
        ("LABORATORY", "Laboratory"),
        ("BOTH", "Lecture & Category"),
    )

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50)
    category = models.CharField(max_length=25, choices=COURSE_CATEGORY)
    department = models.ForeignKey(
        "department.Department", on_delete=models.CASCADE, null=True, blank=True
    )
    pre_requisites = models.ManyToManyField(
        "self", blank=True, symmetrical=False, related_name="course_pre_requisites"
    )
    co_requisites = models.ManyToManyField(
        "self", blank=True, symmetrical=False, related_name="course_co_requisites"
    )
    sections = models.ManyToManyField("section.Section", blank=True)
    lecture_unit = models.IntegerField(default=0)
    lab_unit = models.IntegerField(default=0)
    lecture_hours = models.IntegerField(default=0)
    lab_hours = models.IntegerField(default=0)
    need_masteral = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "course"
        unique_together = ("name", "code")

    def soft_delete(self):
        self.is_active = False
        self.save()

    def save(self, *args, **kwargs):
        if self.pk is None:
            existing_course = Course.objects.filter(
                name=self.name, code=self.code, is_active=False
            ).first()
            if existing_course:
                existing_course.is_active = True
                existing_course.save()
                return

        super().save(*args, **kwargs)
