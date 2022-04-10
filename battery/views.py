from rest_framework.response import Response
from rest_framework import generics, views, status

from battery.models import Battery, Station, Vehicle
from battery.serializers import BatterySerializer, StationSerializer, VehicleSerializer


class ManageBatteries(generics.ListCreateAPIView):
    serializer_class = BatterySerializer
    queryset = Battery.objects.all()


class ManageBattery(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BatterySerializer
    queryset = Battery.objects.all()


class ManageVehicles(generics.ListCreateAPIView):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()


class ManageVehicle(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()


class ManageStations(generics.ListCreateAPIView):
    serializer_class = StationSerializer

    def get_queryset(self):
        return Station.objects.filter(latitude__gte=26)


class ManageStation(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StationSerializer
    queryset = Station.objects.all()
