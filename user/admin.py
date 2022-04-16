from django.contrib import admin

from user.models import Order, User

admin.site.register(User)
admin.site.register(Order)
