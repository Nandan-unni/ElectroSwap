import json
from django.db.models import FloatField, IntegerField, Value
from django.http import HttpResponse
from rest_framework import generics, views, status
from rest_framework.response import Response

from battery.utils import get_distance_btw
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
    queryset = Station.objects.all()

    # def get_queryset(self):
    #     stations = Station.objects.all()
    #     query_set = StationSerializer(stations, many=True)
    #     return query_set


class FindStations(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        stations = Station.objects.all()
        stations_data = []
        for station in stations:
            stations_data.append(
                {
                    "pk": station.pk,
                    "name": station.name,
                    "latitude": station.latitude,
                    "longitude": station.longitude,
                    "distance": get_distance_btw(
                        {"latitude": 90, "longitude": 60},
                        {
                            "latitude": station.latitude,
                            "longitude": station.longitude,
                        },
                    ),
                }
            )
        stations_data.sort(key=lambda station: station["distance"])
        return HttpResponse(
            json.dumps({"stations": stations_data}), content_type="application/json"
        )


class ManageStation(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StationSerializer
    queryset = Station.objects.all()
