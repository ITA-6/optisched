from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from account.models import CustomUser
from professor.serializers import ProfessorSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["email"] = user.email
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name

        return token


class RegisterSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer(
        read_only=True
    )  # Assuming a ProfessorSerializer exists

    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            "password",
            "professor",
            "last_login",
        ]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if user is None:
                raise serializers.ValidationError(
                    "Invalid credentials provided.", code="authorization"
                )
            data["user"] = user
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")

        return data
