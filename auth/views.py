from rest_framework import views, status
from rest_framework.response import Response

from django.conf import settings
from auth.serializers import SignupSerializer
from auth.utils import generate_token_pairs


class SignUpView(views.APIView):
    def post(self, request, *args, **kwargs):
        print(settings.SECRET_KEY)
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.first_name = user.first_name.title()
            user.last_name = user.last_name.title()
            user.is_active = True
            user.set_password(user.password)
            user.save()
            return Response(
                data=generate_token_pairs(user), status=status.HTTP_201_CREATED
            )
        return Response(
            data=serializer.errors, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION
        )
