from django.conf import settings
from django.db import models


class Consumer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True
    )
    vehicle = models.ForeignKey("battery.Vehicle", on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = "Consumer"
        verbose_name_plural = "Consumers"

    def __str__(self):
        return f"{self.user.email} with {self.vehicle.name}"
