"""electroswap URL Configuration"""

from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include


def landing(request):
    return render(request, "index.html")


urlpatterns = [
    path("", landing, name="hwd"),
    path("admin/", admin.site.urls),
    path("user/", include("user.urls")),
    path("consumer/", include("consumer.urls")),
    path("producer/", include("producer.urls")),
    path("power/", include("battery.urls")),
]
