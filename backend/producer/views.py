from rest_framework import generics

from producer.models import Company
from producer.serializers import CompanySerializer


class ManageCompanies(generics.ListCreateAPIView):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()


class ManageCompany(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
