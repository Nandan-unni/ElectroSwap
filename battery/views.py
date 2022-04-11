import json
from django.db.models import FloatField, IntegerField, Value
from django.http import HttpResponse
from rest_framework import generics, views, status
from rest_framework.response import Response

from battery.utils import get_distance_btw, get_station_data
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


class FindStations(views.APIView):
    def get(self, request, *args, **kwargs):
        stations = Station.objects.all()
        stations_data = []
        for station in stations:
            stations_data.append(
                get_station_data(
                    station,
                    float(request.query_params.get("latitude")),
                    float(request.query_params.get("longitude")),
                )
            )
        stations_data.sort(key=lambda station: station["distance"])
        return HttpResponse(
            json.dumps({"success": True, "stations": stations_data}),
            content_type="application/json",
        )


class GetStation(views.APIView):
    def get(self, request, *args, **kwargs):
        try:
            station = Station.objects.get(pk=kwargs["pk"])
            return HttpResponse(
                json.dumps(
                    {
                        "success": True,
                        "station": get_station_data(
                            station,
                            float(request.query_params.get("latitude")),
                            float(request.query_params.get("longitude")),
                        ),
                    }
                )
            )
        except Station.DoesNotExist:
            return HttpResponse(
                json.dumps({"success": False}), content_type="application/json"
            )


class ManageStation(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StationSerializer
    queryset = Station.objects.all()
