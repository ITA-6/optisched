from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated

from account.serializers import (
    AccountSerializer,
    LoginSerializer,
    CustomTokenObtainPairSerializer,
)

from account.models import CustomUser
from professor.models import Professor
from section.models import Section
from room.models import Room
from course.models import Course


class AccountApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        data = {}

        if serializer.is_valid(raise_exception=True):
            account = serializer.save()

            data["response"] = "account has been created"
            data["username"] = account.username
            data["email"] = account.email

            return Response(data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk:
            try:
                account = CustomUser.objects.get(pk=pk)
                serializer = AccountSerializer(account)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response(
                    {"error": "User not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            users = CustomUser.objects.all()
            serializer = AccountSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class LoginApiView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            refresh = CustomTokenObtainPairSerializer().get_token(user)

            # If you need to add more custom claims dynamically, you can do so here
            # For example:
            # refresh['custom_claim'] = 'custom_value'

            access_token = refresh.access_token

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(access_token),
                    "success": "Login successful.",
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"error": "Invalid credentials provided."},
            status=status.HTTP_401_UNAUTHORIZED,
        )


class LogoutApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"success": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            return Response(
                {"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST
            )


class CountApiView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        # Counting the number of CustomAccount instances
        professor_count = Professor.objects.count()
        section_count = Section.objects.count()
        room_count = Room.objects.count()
        course_count = Course.objects.count()

        # Returning both counts in the response
        return Response(
            {
                "professor_count": professor_count,
                "section_count": section_count,
                "room_count": room_count,
                "course_count": course_count,
            }
        )
