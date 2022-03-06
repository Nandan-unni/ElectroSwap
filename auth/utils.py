from rest_framework_simplejwt.tokens import RefreshToken


def generate_token_pairs(user):
    refresh = RefreshToken.for_user(user)

    return {
        "access_token": str(refresh.access_token),
        "refresh_token": str(refresh),
    }
