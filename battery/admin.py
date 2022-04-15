from django.contrib import admin

from battery.models import Battery, Station, Vehicle

admin.site.register(Station)
admin.site.register(Battery)
admin.site.register(Vehicle)
