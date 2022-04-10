from django.urls import path

from producer.views import ManageCompanies, ManageCompany


urlpatterns = [
    path("companies/", ManageCompanies.as_view(), name="manage_companies"),
    path("company/<int:pk>/", ManageCompany.as_view(), name="manage_company"),
]
