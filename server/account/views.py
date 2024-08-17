from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.views import APIView
from rest_framework.authentication import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


class RegisterApiView(APIView):
    serializer = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        data = {}

        if serializer.is_valid(raise_exception=True):
            account = serializer.save()

            data["response"] = "account has been created"
            data["username"] = account.username
            data["email"] = account.email
            data["first_name"] = account.first_name
            data["last_name"] = account.last_name
            data["department"] = account.department

        else:
            data = serializer.errors

        return Response(data)


@method_decorator(csrf_exempt, name="dispatch")
class LoginApiView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = authenticate(request, email=email, password=password)

            if not user:
                return Response(
                    {"error": "Invalid email or password."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            if user.is_active:
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "Success": "Login Successfully",
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "This account is inactive."},
                    status=status.HTTP_403_FORBIDDEN,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
