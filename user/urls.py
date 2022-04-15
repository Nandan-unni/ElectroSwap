from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from user.views import SignInView, SignUpView


urlpatterns = [
    path("token/refresh/", TokenRefreshView.as_view(), name="auth_token_refresh"),
    path("token/pair/", TokenObtainPairView.as_view(), name="auth_token_pair"),
    path("signin/", SignInView.as_view(), name="auth_signin"),
    path("signup/", SignUpView.as_view(), name="auth_signup"),
]
