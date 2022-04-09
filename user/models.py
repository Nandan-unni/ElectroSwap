from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, name, email, password=None):
        if not name:
            raise ValueError("Users must provide a name.")
        if not email:
            raise ValueError("Users must provide an email id")
        user = self.model(
            name=name.title(),
            email=self.normalize_email(email),
            username=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        print("User created successfully.")
        return user

    def create_superuser(self, name, email, password=None):
        user = self.create_user(name=name, email=email, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    name = models.CharField("Name", max_length=100)
    email = models.EmailField("Email", max_length=100, unique=True)
    username = models.CharField("Username", max_length=100, unique=True)
    user_type = models.CharField("User Type", max_length=10)
    is_active = models.BooleanField(default=True)
    is_email_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.email
