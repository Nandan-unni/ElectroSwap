from rest_framework import serializers
from django.contrib.auth import get_user_model


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    def create(self, validated_data):
        processed_data = validated_data
        processed_data["username"] = validated_data["email"]
        processed_data["name"] = validated_data["name"].title()
        processed_data["is_active"] = True
        return super().create(processed_data)

    class Meta:
        model = get_user_model()
        fields = ["name", "email", "password", "user_type"]
