from django.utils import timezone

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
    AuthenticationHistorySerializer,
)

from account.models import CustomUser, AuthenticationHistory
from professor.models import Professor
from section.models import Section
from room.models import Room
from course.models import Course


class AccountApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get_user_data(self, request):
        return {
            "user_id": request.data.get("professor_id"),
            "username": request.data.get("professor_id"),
            "password": request.data.get("password")
            or request.data.get("birth_date"),  # Consider securing password more
            "email": request.data.get("email"),
            "first_name": request.data.get("first_name"),
            "last_name": request.data.get("last_name"),
            "middle_name": request.data.get("middle_name"),
            "user_type": request.data.get("user_type"),
            "birth_date": request.data.get("birth_date"),
            "department": request.data.get("department"),
        }

    def post(self, request):
        user_data = self.get_user_data(request)

        serializer = AccountSerializer(data=user_data)
        if serializer.is_valid(raise_exception=True):
            account = serializer.save()

            data = {
                "response": "Account has been created",
                "username": account.username,
                "email": account.email,
            }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, **kwargs):
        pk = kwargs.get("pk")
        try:
            user = CustomUser.objects.get(user_id=pk)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )

        user_data = self.get_user_data(request)
        account_serializer = AccountSerializer(user, data=user_data)
        account_serializer.is_valid(raise_exception=True)
        user = account_serializer.save()

        data = {
            "message": "User has been updated.",
            "data": account_serializer.data,
        }
        return Response(data, status=status.HTTP_200_OK)

    def get(self, request, **kwargs):
        pk = kwargs.get("pk")
        if pk:
            try:
                account = CustomUser.objects.get(pk=pk)
                serializer = AccountSerializer(account)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response(
                    {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
                )
        else:
            users = CustomUser.objects.all()
            serializer = AccountSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, **kwargs):
        pk = kwargs.get("pk")
        try:
            instance = CustomUser.objects.get(user_id=pk)
            instance.delete()
            return Response(
                {"message": "User has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )


class LoginApiView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_client_ip(self, request):
        """Get the client's IP address from the request headers."""
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            # Log login history
            ip_address = self.get_client_ip(request)
            user_agent = request.META.get("HTTP_USER_AGENT", "")

            AuthenticationHistory.objects.create(
                user=user,
                time=timezone.now(),
                session="LOGIN",  # Assuming "session" is meant to describe the action
                ip_address=ip_address,
                user_agent=user_agent,
            )

            refresh = CustomTokenObtainPairSerializer().get_token(user)
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
            # Get the refresh token from the request data
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response(
                    {"error": "Refresh token is required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            # Get the user, IP address, and user agent
            user = request.user
            ip_address = request.META.get("REMOTE_ADDR")
            user_agent = request.META.get("HTTP_USER_AGENT")

            # Log the logout event in AuthenticationHistory
            AuthenticationHistory.objects.create(
                user=user,
                time=timezone.now(),
                session="LOGOUT",  # Assuming "session" is meant to describe the action
                ip_address=ip_address,
                user_agent=user_agent,
            )

            return Response(
                {"success": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT
            )

        except Exception:
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


class LoginHistoryApiView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        login_history = AuthenticationHistory.objects.all().order_by("-time")
        serializer = AuthenticationHistorySerializer(login_history, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
