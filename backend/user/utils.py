from rest_framework_simplejwt.tokens import RefreshToken


def generate_token_pairs(user):
    refresh = RefreshToken.for_user(user)

    return {
        "access_token": str(refresh.access_token),
        "refresh_token": str(refresh),
    }


def get_order_data(order):
    return {
        "pk": order.pk,
        "station": {
            "pk": order.station.pk,
            "name": order.station.name,
        },
        "battery": {
            "pk": order.battery.pk,
            "vehicle": {
                "pk": order.battery.vehicle.pk,
                "name": order.battery.vehicle.name,
            },
            "company": {
                "pk": order.battery.company.pk,
                "name": order.battery.company.name,
            },
            "price": order.battery.price,
        },
        "is_paid": order.is_paid,
        "is_collected": order.is_collected,
        "booked_time": order.booked_time,
        "expiry_time": order.expiry_time,
    }
