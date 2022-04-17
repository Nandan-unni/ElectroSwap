import datetime
from rest_framework import views, status, generics
from rest_framework.response import Response

from django.contrib.auth import authenticate, login
from user.models import Order, User
from consumer.models import Consumer
from producer.models import Company, Producer
from battery.models import Battery, Station, Vehicle


from user.serializers import SignupSerializer, UserSerializer
from user.utils import generate_token_pairs, get_order_data


class ManageUsers(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ManageUser(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class SignInView(views.APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user = authenticate(
            username=data.get("email", None), password=data.get("password", None)
        )
        if user is not None:
            # if user.is_email_verified:
            login(request, user)
            meta_data = {}
            if user.user_type == "consumer":
                consumer = Consumer.objects.get(user=user)
                meta_data = {
                    "vehicle": {
                        "name": consumer.vehicle.name,
                        "pk": consumer.vehicle.pk,
                    }
                }
            else:
                producer = Producer.objects.get(user=user)
                meta_data = {
                    "company": {
                        "name": producer.company.name,
                        "pk": producer.company.pk,
                    }
                }
            return Response(
                data={
                    "success": True,
                    "message": f"Welcome back, {user.name}",
                    "tokens": generate_token_pairs(user),
                    "user": {
                        "user_type": user.user_type,
                        "meta_data": meta_data,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
            # return Response(
            #     status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            #     data={
            #         "msg": "A verification mail is send to your email address. Please verify your email address to Login."
            #     },
            # )
        return Response(
            data={
                "success": False,
                "message": "Invalid Credentials",
                "tokens": generate_token_pairs(user),
            },
            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
        )


class SignUpView(views.APIView):
    # permission_classes = [
    #     IsAuthenticated,
    # ]

    def post(self, request, *args, **kwargs):
        # try:
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            meta_data = {}
            if user.user_type == "consumer":
                consumer = Consumer.objects.get(user=user)
                # vehicle = Vehicle.objects.get(pk=consumer.vehicle)
                meta_data = {
                    "vehicle": {
                        "name": consumer.vehicle.name,
                        "pk": consumer.vehicle.pk,
                    }
                }
            else:
                producer = Producer.objects.get(user=user)
                company = Company.objects.get(pk=producer.company)
                meta_data = {"company": {"name": company.name, "pk": company.pk}}
            return Response(
                data={
                    "success": True,
                    "message": f"Welcome back, {user.name}",
                    "tokens": generate_token_pairs(user),
                    "user": {
                        "user_type": user.user_type,
                        "meta_data": meta_data,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        msg = ""
        for err in serializer.errors.values():
            for val in err:
                if msg == "":
                    msg = val
        return Response(
            data={
                "success": False,
                "message": msg,
                "error": serializer.errors,
            },
            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
        )

    # except Exception as error:
    #     print(error)
    #     return Response(
    #         data={
    #             "success": False,
    #             "message": "Sever failure. Please try again later",
    #             "error": str(error),
    #         },
    #         status=status.HTTP_202_ACCEPTED,
    #     )


class Orders(views.APIView):
    def post(self, request, *args, **kwargs):
        try:
            print(request.data)
            battery = Battery.objects.get(pk=request.data.get("battery"))
            station = Station.objects.get(pk=request.data.get("station"))
            user = User.objects.get(pk=request.user.pk)

            station.batteries.remove(battery)
            station.booked_batteries.add(battery)
            station.save()

            order = Order.objects.create(
                battery=battery,
                station=station,
                expiry_time=datetime.datetime.now() + datetime.timedelta(days=1),
                is_paid=True,
            )
            order.save()

            user.orders.add(order)
            user.save()

            return Response(
                data={"success": True, "order_pk": order.pk}, status=status.HTTP_200_OK
            )
        except Exception as e:
            print(e)
            return Response(
                data={"success": False},
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            )

    def get(self, request, *args, **kwargs):
        try:
            orders_data = []
            for order in request.user.orders.all():
                orders_data.append(get_order_data(order))
            return Response(
                status=status.HTTP_200_OK, data={"success": True, "orders": orders_data}
            )
        except Exception as e:
            print(e)
            return Response(
                data={"success": False},
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            )


class CollectOrder(views.APIView):
    def get(self, request, *args, **kwargs):
        try:
            order = Order.objects.get(pk=kwargs["pk"])
            order.is_collected = True
            order.save()
            return Response(data={"success": True}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(
                data={"success": False},
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            )


class GetOrder(views.APIView):
    def get(self, request, *args, **kwargs):
        try:
            order_data = {}
            found = False
            for order in request.user.orders.all():
                if order.pk == kwargs["pk"]:
                    found = True
                    order_data = get_order_data(order)
            if found:
                return Response(
                    status=status.HTTP_200_OK,
                    data={"success": True, "order": order_data},
                )
            else:
                return Response(
                    status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
                    data={"success": False},
                )
        except Exception as e:
            print(e)
            return Response(
                data={"success": False},
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            )
