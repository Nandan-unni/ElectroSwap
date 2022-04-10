from django.conf import settings
from django.db import models


class Company(models.Model):
    name = models.CharField("Company Name", max_length=150, null=True)

    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"

    def __str__(self):
        return f"{self.name}"


class Producer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True
    )
    company = models.ForeignKey("producer.Company", on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = "Producer"
        verbose_name_plural = "Producers"

    def __str__(self):
        return f"{self.user.email} from {self.company.name}"
