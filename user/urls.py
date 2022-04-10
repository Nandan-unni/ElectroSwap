from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from user.views import SignUpView


urlpatterns = [
    path("token/refresh/", TokenRefreshView.as_view(), name="auth_token_refresh"),
    path("signin/", TokenObtainPairView.as_view(), name="auth_token_pair"),
    path("signup/", SignUpView.as_view(), name="auth_signup"),
]
