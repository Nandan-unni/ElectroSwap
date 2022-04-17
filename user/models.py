from django.db import models
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
            user_type="producer",
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
    phone = models.CharField("Phone", max_length=11, null=True)
    user_type = models.CharField("User Type", max_length=10)
    is_active = models.BooleanField(default=True)
    is_email_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    orders = models.ManyToManyField(
        "Order", related_name="Orders", blank=True, symmetrical=False
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.email


class Order(models.Model):
    battery = models.ForeignKey("battery.Battery", on_delete=models.CASCADE)
    station = models.ForeignKey("battery.Station", on_delete=models.CASCADE)
    is_paid = models.BooleanField("Is paid by user", default=False)
    is_collected = models.BooleanField("Is collected by user", default=False)
    booked_time = models.DateTimeField("Order booked at", auto_now_add=True)
    expiry_time = models.DateTimeField("Order expires on")

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def __str__(self):
        return f"{self.battery} from {self.station.name}"
