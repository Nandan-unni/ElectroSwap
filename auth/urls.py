from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from auth.views import SignUpView

urlpatterns = [
    path("token/pair/", TokenObtainPairView.as_view(), name="auth_token_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="auth_token_refresh"),
    path("signup/", SignUpView.as_view(), name="auth_signup"),
]
