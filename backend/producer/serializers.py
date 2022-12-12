from rest_framework import serializers

from producer.models import Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["pk", "name"]
