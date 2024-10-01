from professor.models import Professor

from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
)
from django.utils import timezone


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

    username = models.CharField(max_length=10, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    professor = models.OneToOneField(
        Professor, on_delete=models.CASCADE, null=True, blank=True
    )
    first_name = models.CharField(max_length=255, default="John")
    last_name = models.CharField(max_length=255, default="Doe")
    middle_name = models.CharField(max_length=255, null=True, blank=True)
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

    class Meta:
        db_table = "user"

    def __str__(self):
        return self.username
