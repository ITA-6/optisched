from professor.models import Professor

from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
)
from django.utils import timezone
from django.conf import settings


class CustomUserManager(BaseUserManager):
    USER_ADMIN = ("R", "Registrar")

    def create_user(self, email, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_admin(self, email, password=None, **extra_fields):
        extra_fields.setdefault("user_type", self.USER_ADMIN[0])
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    DEFAULT_USER = ("P", "Professor")

    USER_TYPES_CHOICES = [
        ("R", "Registrar"),
        ("DC", "Department Chair"),
        ("D", "Dean"),
        ("P", "Professor"),
        ("VPAA", "Vice President for Academic Affairs"),
    ]

    PRIVILEGE_LEVELS = {
        "R": "admin",  # Registrar
        "DC": "sub_admin",  # Department Chair
        "D": "sub_admin",  # Dean
        "P": "user",  # Professor
        "VPAA": "user",  # Vice President for Academic Affairs
    }

    user_id = models.BigIntegerField(unique=True)
    username = models.CharField(max_length=10, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    professor = models.OneToOneField(
        Professor, on_delete=models.CASCADE, null=True, blank=True
    )
    first_name = models.CharField(max_length=255, default="John")
    last_name = models.CharField(max_length=255, default="Doe")
    middle_name = models.CharField(max_length=255, null=True, blank=True)
    birth_date = models.DateField(default=timezone.now)
    department = models.ForeignKey(
        "department.Department", on_delete=models.CASCADE, blank=True, null=True
    )
    is_active = models.BooleanField(default=True)
    user_type = models.CharField(
        max_length=5, choices=USER_TYPES_CHOICES, default=DEFAULT_USER[0]
    )
    last_login = models.DateTimeField(null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"

    REQUIRED_FIELDS = ["email"]

    def get_privilege(self):
        return self.PRIVILEGE_LEVELS.get(self.user_type, "user")

    class Meta:
        db_table = "user"

    def __str__(self):
        return self.username


class ActivityHistory(models.Model):
    ACTION_TYPES = [
        ("CREATE", "Create"),
        ("UPDATE", "Update"),
        ("DELETE", "Delete"),
        ("LOGIN", "Login"),
        ("LOGOUT", "Logout"),
        ("OTHER", "Other"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="activity_history",
    )
    time = models.DateTimeField(default=timezone.now)
    action = models.CharField(
        max_length=25, choices=ACTION_TYPES, blank=True, null=True
    )
    model_name = models.CharField(
        max_length=255, null=True, blank=True
    )  # e.g., "Professor"
    object_id = models.CharField(
        max_length=255, null=True, blank=True
    )  # ID of the object acted upon
    description = models.TextField(
        null=True, blank=True
    )  # e.g., "Created Professor John Doe"
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        verbose_name = "Activity History"
        verbose_name_plural = "Activity Histories"
        ordering = ["-time"]

    def __str__(self):
        return f"{self.action} on {self.model_name} ({self.object_id}) by {self.user.username} at {self.time}"
