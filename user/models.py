from django.db import models
from django.contrib.auth.models import AbstractUser

from user.managers import UserManager

# Create your models here.
class User(AbstractUser):
    """User Model"""

    first_name = models.CharField("First Name", max_length=50)
    last_name = models.CharField("Last Name", max_length=50)
    username = models.CharField("Username", max_length=30, unique=True)
    email = models.EmailField("Email", max_length=50, unique=True)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "first_name"]

    def __str__(self):
        return self.username
