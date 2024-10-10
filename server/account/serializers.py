from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from account.models import CustomUser
from professor.serializers import ProfessorSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["email"] = user.email
        token["user_type"] = user.user_type

        return token


class AccountSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer(read_only=True)
    department_name = serializers.CharField(source="department.name", read_only=True)
    user_type_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            "user_id",
            "username",
            "email",
            "password",
            "professor",
            "first_name",
            "middle_name",
            "last_name",
            "department_name",
            "birth_date",
            "department",
            "user_type",
            "user_type_name",
            "last_login",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            },  # Prevent password from being exposed in the serialized output
            "last_login": {
                "read_only": True
            },  # Ensure last_login is not manually updated
        }

    def get_user_type_name(self, obj):
        """Map the user_type code to its corresponding human-readable name."""
        return dict(CustomUser.USER_TYPES_CHOICES).get(obj.user_type, "Unknown")

    def create(self, validated_data):
        # Securely hash the password before saving
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # If the password is being updated, hash it before saving
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])

        return super().update(instance, validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User account is inactive.")
                attrs["user"] = user
            else:
                raise serializers.ValidationError("Invalid username or password.")
        else:
            raise serializers.ValidationError(
                "Both username and password are required."
            )
        return attrs
