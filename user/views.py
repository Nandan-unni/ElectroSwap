from rest_framework import views, status
from rest_framework.response import Response

from django.contrib.auth import get_user_model, authenticate, login, logout
from consumer.models import Consumer
from producer.models import Company, Producer
from battery.models import Vehicle

# from rest_framework.permissions import IsAuthenticated

from user.serializers import SignupSerializer
from user.utils import generate_token_pairs


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
        print(request.data)
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
