from math import radians, asin, sqrt, sin, cos
from turtle import back


def closest(stations, currLoc):
    return min(stations, key=lambda station: get_distance_btw(currLoc, station))


def get_distance_btw(currLoc, station) -> str:
    # deg -> rad
    station["longitude"] = radians(station["longitude"])
    currLoc["longitude"] = radians(currLoc["longitude"])
    station["latitude"] = radians(station["latitude"])
    currLoc["latitude"] = radians(currLoc["latitude"])

    # Haversine formula
    dlon = currLoc["longitude"] - station["longitude"]
    dlat = currLoc["latitude"] - station["latitude"]
    c = 2 * asin(
        sqrt(
            sin(dlat / 2) ** 2
            + cos(station["latitude"]) * cos(currLoc["latitude"]) * sin(dlon / 2) ** 2
        )
    )

    # radius of earth = 6371 km or 3956 miles
    d_num = c * 6371 * 1000
    t_num = d_num / 45000

    if d_num > 1000:
        d_str = round(d_num / 1000, 2)
        d_str = str(d_str) + " km" + ("s" if d_str > 1 else "")
    else:
        d_str = round(d_num, 1)
        d_str = str(d_str) + "  m" + ("s" if d_str > 1 else "")

    if t_num < 1 / 60:
        t_str = round((t_num * 60 * 60), 2)
        t_str = str(t_str) + " sec"
    elif t_num < 1:
        t_str = round((t_num * 60), 2)
        t_str = str(t_str) + " min"
    else:
        t_str = round(t_num, 1)
        t_str = str(t_str) + " hr"
    return d_num, d_str, t_num, t_str


def get_station_data(station, userLat, userLong):
    d_num, d_str, t_num, t_str = get_distance_btw(
        {"latitude": userLat, "longitude": userLong},
        {"latitude": station.latitude, "longitude": station.longitude},
    )
    batteries = []
    for battery in station.batteries.all():
        batteries.append(
            {
                "pk": battery.pk,
                "vehicle": {"name": battery.vehicle.name, "pk": battery.vehicle.pk},
                "company": {"name": battery.company.name, "pk": battery.company.pk},
                "price": battery.price,
            }
        )
    return {
        "pk": station.pk,
        "name": station.name,
        "latitude": station.latitude,
        "longitude": station.longitude,
        "batteries": batteries,
        "distance": d_num,
        "time": t_num,
        "distance_msg": d_str,
        "time_msg": t_str,
    }


def get_battery_data(battery):
    return {"name": str(battery), "pk": battery.pk, "company": battery.company.pk}
