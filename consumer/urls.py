from django.urls import path

from consumer.views import ManageConsumer

urlpatterns = [path("manage/", ManageConsumer.as_view(), name="consumer_manage")]
