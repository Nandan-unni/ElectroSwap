from rest_framework import views, status
from rest_framework.response import Response

# from rest_framework.permissions import IsAuthenticated

from user.serializers import SignupSerializer
from user.utils import generate_token_pairs

#
class SignUpView(views.APIView):
    # permission_classes = [
    #     IsAuthenticated,
    # ]

    def post(self, request, *args, **kwargs):
        try:
            serializer = SignupSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                return Response(
                    data={
                        "success": True,
                        "message": f"Welcome back, {user.name}",
                        "tokens": generate_token_pairs(user),
                    },
                    status=status.HTTP_201_CREATED,
                )
            msg = ""
            for err in serializer.errors.values():
                for val in err:
                    if msg == "":
                        msg = val
            return Response(
                data={
                    "success": False,
                    "message": msg,
                    "error": serializer.errors,
                },
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            )
        except Exception as error:
            print(error)
            return Response(
                data={
                    "success": False,
                    "message": "Sever failure. Please try again later",
                    "error": str(error),
                },
                status=status.HTTP_202_ACCEPTED,
            )
