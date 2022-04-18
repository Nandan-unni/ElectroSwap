from electroswap import config
import razorpay
from rest_framework import generics, views, status
from rest_framework.response import Response

# from rest_framework.permissions import IsAuthenticated

from battery.utils import get_station_data
from consumer.models import Consumer
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


class ListVehicles(generics.ListAPIView):
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
    # permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        stations = Station.objects.all()
        if request.user.user_type == "consumer":
            consumer = Consumer.objects.get(user=request.user)
            try:
                latitude = request.query_params.get("latitude", 9.9312)
                longitude = request.query_params.get("longitude", 76.2673)
                if latitude == "undefined":
                    latitude = 9.9312
                if longitude == "undefined":
                    longitude = 76.2673
                stations_data = []
                batteries = Battery.objects.filter(vehicle=consumer.vehicle)
                for station in stations:
                    if any(battery in batteries for battery in station.batteries.all()):
                        stations_data.append(
                            get_station_data(station, float(latitude), float(longitude))
                        )
                stations_data.sort(key=lambda station: station["distance"])
                return Response(
                    data={"success": True, "stations": stations_data},
                    status=status.HTTP_200_OK,
                )
            except Battery.DoesNotExist:
                return Response(
                    data={"success": False, "stations": []},
                    status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
                )
        return Response(
            data={"success": False, "stations": []},
            status=status.HTTP_401_UNAUTHORIZED,
        )


class GetStation(views.APIView):
    def get(self, request, *args, **kwargs):
        try:
            station = Station.objects.get(pk=kwargs["pk"])
            return Response(
                data={
                    "success": True,
                    "station": get_station_data(
                        station,
                        float(request.query_params.get("latitude")),
                        float(request.query_params.get("longitude")),
                    ),
                },
                status=status.HTTP_200_OK,
            )
        except Station.DoesNotExist:
            return Response(
                data={"success": False},
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            )


class Payments(views.APIView):
    def get(self, request, *args, **kwargs):
        return Response(data={})

    def post(self, request, *args, **kwargs):
        client = razorpay.Client(auth=(config.RAZORPAY_ID, config.RAZORPAY_SECRET))
        DATA = {
            "amount": int(request.data.get("amount")),
            "currency": "INR",
            "receipt": "receipt#1",
            "notes": {"vehicle": "Vehicle", "station": "Station"},
        }
        client.order.create(data=DATA)
        return Response(data={})


class ManageStation(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StationSerializer
    queryset = Station.objects.all()
