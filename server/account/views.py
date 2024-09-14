from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import AllowAny

from account.serializers import RegisterSerializer, LoginSerializer
from professor.models import Professor
from section.models import Section
from room.models import Room
from course.models import Course


class Account(APIView):
    pass


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

            return Response(data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name="dispatch")
class LoginApiView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            if not user.is_active:
                return Response(
                    {"error": "This account is inactive."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "success": "Login successfully.",
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"error": "Invalid credentials provided."},
            status=status.HTTP_401_UNAUTHORIZED,
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
                "user_count": professor_count,
                "section_count": section_count,
                "room_count": room_count,
                "course_count": course_count,
            }
        )
