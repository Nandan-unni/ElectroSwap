from rest_framework import serializers
from django.contrib.auth import get_user_model

from battery.models import Vehicle
from producer.models import Producer
from consumer.models import Consumer


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    vehicle = serializers.IntegerField()

    def create(self, validated_data, *args):
        print(args)
        user_data = {}
        user_data["name"] = validated_data["name"].title()
        user_data["username"] = validated_data["email"]
        user_data["email"] = validated_data["email"]
        user_data["user_type"] = validated_data["user_type"]
        user_data["password"] = validated_data["password"]
        user_data["is_active"] = True
        user = super().create(user_data)
        user.set_password(user.password)
        user.save()
        if validated_data["user_type"] == "consumer":
            consumer = Consumer.objects.create(user=user)
            consumer.vehicle = Vehicle.objects.get(pk=validated_data["vehicle"])
            consumer.save()
        elif validated_data["user_type"] == "producer":
            producer = Producer.objects.create(user=user)
            producer.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ["name", "email", "vehicle", "password", "user_type"]
