from math import radians, asin, sqrt, sin, cos


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
    if d_num > 1000:
        d_str = round(d_num / 1000, 2)
        d_str = str(d_str) + " km" + ("s" if d_str > 1 else "")
    else:
        d_str = round(d_num, 1)
        d_str = str(d_str) + "  m" + ("s" if d_str > 1 else "")
    return d_num, d_str
