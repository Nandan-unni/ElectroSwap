from rest_framework import serializers
from battery.models import Battery, Station, Vehicle


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ["pk", "name", "latitude", "longitude"]


class NewBatteriesSerializer(serializers.Serializer):
    class Meta:
        model = Station
        fields = ["batteries"]


class BatterySerializer(serializers.ModelSerializer):
    class Meta:
        model = Battery
        fields = ["pk", "vehicle", "company", "price"]


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ["pk", "name"]
