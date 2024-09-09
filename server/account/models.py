from professor.models import Professor

from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
)
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_admin(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_admin", True)

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=10, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    professor = models.OneToOneField(
        Professor, on_delete=models.CASCADE, null=True, blank=True
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
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
