from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from battery.models import Vehicle
from consumer.models import Consumer
from user.models import User


class ManageConsumer(APIView):
    def get(self, request, *args, **kwargs):
        consumer = Consumer.objects.get(user=request.user)
        return Response(
            status=status.HTTP_200_OK,
            data={
                "success": True,
                "user": {
                    "name": consumer.user.name,
                    "phone": request.user.phone,
                    "vehicle": {
                        "pk": consumer.vehicle.pk,
                        "name": consumer.vehicle.name,
                    },
                },
            },
        )

    def put(self, request, *args, **kwargs):
        consumer = Consumer.objects.get(user=request.user)
        user = User.objects.get(pk=request.user.pk)
        user.name = request.data.get("name")
        user.phone = request.data.get("phone")
        consumer.vehicle = Vehicle.objects.get(pk=request.data.get("vehicle"))
        user.save()
        consumer.save()
        return Response(status=status.HTTP_200_OK, data={"success": True})

    def delete(self, request, *args, **kwargs):
        consumer = Consumer.objects.get(user=request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)
