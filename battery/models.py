from django.db import models


class Vehicle(models.Model):
    name = models.CharField("Vehicle Name", max_length=150)

    class Meta:
        verbose_name = "Vehicle"
        verbose_name_plural = "Vehicles"

    def __str__(self):
        return f"{self.name}"


class Battery(models.Model):
    vehicle = models.ForeignKey("battery.Vehicle", on_delete=models.CASCADE, null=True)
    company = models.ForeignKey("producer.Company", on_delete=models.CASCADE, null=True)
    price = models.FloatField("Price")

    class Meta:
        verbose_name = "Battery"
        verbose_name_plural = "Batteries"

    def __str__(self):
        return f"{self.company.name}'s Battery for {self.vehicle.name}"


class Station(models.Model):
    name = models.CharField("Station Name", max_length=150, null=True)
    latitude = models.FloatField("Latitude")
    longitude = models.FloatField("Longitude")
    batteries = models.ManyToManyField(
        "battery.Battery", related_name="Batteries", blank=True, symmetrical=False
    )

    class Meta:
        verbose_name = "Station"
        verbose_name_plural = "Stations"

    def __str__(self) -> str:
        return f"{self.name} ({self.batteries.count()} batteries)"
