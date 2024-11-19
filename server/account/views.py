from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from account.serializers import (
    AccountSerializer,
    LoginSerializer,
    CustomTokenObtainPairSerializer,
    ActivityHistorySerializer,
    ChangePasswordSerializer,
)

from account.models import CustomUser, ActivityHistory
from professor.models import Professor
from section.models import Section
from room.models import Room
from course.models import Course

from django.utils.timezone import now


class AccountApiView(APIView):
    permission_classes = [IsAuthenticated]

    def log_activity(self, request, action, instance=None, description=None):
        """
        Logs activity into the ActivityHistory model.

        Args:
            request (HttpRequest): The HTTP request object.
            action (str): Action type (e.g., CREATE, UPDATE, DELETE).
            instance (Model): The CustomUser instance involved (optional).
            description (str): Detailed description of the action (optional).
        """
        user = request.user
        ip_address = (
            request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0]
            if "HTTP_X_FORWARDED_FOR" in request.META
            else request.META.get("REMOTE_ADDR")
        )
        user_agent = request.META.get("HTTP_USER_AGENT", "")

        ActivityHistory.objects.create(
            user=user,
            action=action,
            model_name="CustomUser",
            object_id=str(instance.id) if instance else None,
            description=description,
            ip_address=ip_address,
            user_agent=user_agent,
            time=now(),
        )

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

            # Log the creation activity
            self.log_activity(
                request,
                action="CREATE",
                instance=account,
                description=f"Created account with user ID {account.user_id}.",
            )

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
        updated_user = account_serializer.save()

        # Log the update activity
        self.log_activity(
            request,
            action="UPDATE",
            instance=updated_user,
            description=f"Updated account with user ID {updated_user.user_id}.",
        )

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
            user = CustomUser.objects.get(user_id=pk)
            user.delete()

            # Log the delete activity
            self.log_activity(
                request,
                action="DELETE",
                instance=user,
                description=f"Deleted account with user ID {pk}.",
            )

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

    def get_client_ip(self, request):
        """
        Get the client's IP address from the request headers.
        """
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

            ActivityHistory.objects.create(
                user=user,
                time=now(),
                action="LOGIN",  # Generalized action type
                model_name="Authentication",  # Context for the activity
                object_id=None,  # No specific object ID for login
                description=f"User {user.username} logged in.",
                ip_address=ip_address,
                user_agent=user_agent,
            )

            # Generate tokens using the custom serializer
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

    """
    Handles logout functionality and logs the activity in ActivityHistory.
    """

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
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:
                return Response(
                    {"error": f"Token blacklisting failed: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Get the user, IP address, and user agent
            user = request.user
            ip_address = (
                request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0]
                if "HTTP_X_FORWARDED_FOR" in request.META
                else request.META.get("REMOTE_ADDR")
            )
            user_agent = request.META.get("HTTP_USER_AGENT", "")

            # Log the logout event in ActivityHistory
            ActivityHistory.objects.create(
                user=user,
                time=now(),
                action="LOGOUT",  # Action type
                model_name="Authentication",  # Model or system context
                object_id=None,  # No specific object ID for logout
                description=f"User {user.username} logged out.",
                ip_address=ip_address,
                user_agent=user_agent,
            )

            return Response(
                {"success": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT
            )

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class CountApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_privilege = user.get_privilege()

        if user_privilege == "admin":
            # Admin: Counts across all departments
            professor_count = Professor.objects.filter(is_active=True).count()
            section_count = Section.objects.filter(is_active=True).count()
            room_count = Room.objects.filter(is_active=True).count()
            course_count = Course.objects.filter(is_active=True).count()

        elif user_privilege == "sub_admin":
            # Sub-admin: Counts restricted to the user's department
            department = user.department
            professor_count = Professor.objects.filter(
                department=department, is_active=True
            ).count()
            section_count = Section.objects.filter(
                department=department, is_active=True
            ).count()
            room_count = Room.objects.filter(
                department=department, is_active=True
            ).count()
            course_count = Course.objects.filter(
                department=department, is_active=True
            ).count()
        else:
            # Unauthorized users
            return Response(
                {"error": "You do not have permission to access this data."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Return the counts
        return Response(
            {
                "professor_count": professor_count,
                "section_count": section_count,
                "room_count": room_count,
                "course_count": course_count,
            },
            status=status.HTTP_200_OK,
        )


class ActivityHistoryApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        login_history = ActivityHistory.objects.all().order_by("-time")
        serializer = ActivityHistorySerializer(login_history, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChangePasswordApiView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": "Password updated successfully."}, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
