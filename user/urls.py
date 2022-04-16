from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from user.views import CollectOrder, GetOrder, Orders, SignInView, SignUpView


urlpatterns = [
    path("token/refresh/", TokenRefreshView.as_view(), name="auth_token_refresh"),
    path("token/pair/", TokenObtainPairView.as_view(), name="auth_token_pair"),
    path("signin/", SignInView.as_view(), name="auth_signin"),
    path("signup/", SignUpView.as_view(), name="auth_signup"),
    path("orders/", Orders.as_view(), name="user_orders"),
    path("order/<int:pk>/", GetOrder.as_view(), name="user_order"),
    path("order/collect/<int:pk>/", CollectOrder.as_view(), name="order_collect"),
]
