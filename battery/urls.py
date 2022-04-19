from django.urls import path

from battery.views import (
    FindStations,
    GetStation,
    ListBatteries,
    ListVehicles,
    ManageBatteries,
    ManageBattery,
    ManageStationBatteries,
    ManageStations,
    ManageStation,
    ManageVehicle,
    ManageVehicles,
)


urlpatterns = [
    path("batteries/", ManageBatteries.as_view(), name="manage_batteries"),
    path("batteries/list/", ListBatteries.as_view(), name="manage_batteries_list"),
    path("stations/", ManageStations.as_view(), name="manage_stations"),
    path("stations/find/<int:pk>/", FindStations.as_view(), name="find_stations"),
    path("vehicles/", ManageVehicles.as_view(), name="manage_vehicles"),
    path("vehicles/list/", ListVehicles.as_view(), name="list_vehicles"),
    path("battery/<int:pk>/", ManageBattery.as_view(), name="manage_battery"),
    path("station/<int:pk>/", ManageStation.as_view(), name="manage_station"),
    path(
        "station/batteries/<int:pk>/",
        ManageStationBatteries.as_view(),
        name="manage_stations_batteries",
    ),
    path("station/get/<int:pk>/", GetStation.as_view(), name="get_station"),
    path("vehicle/<int:pk>/", ManageVehicle.as_view(), name="manage_vehicle"),
]
