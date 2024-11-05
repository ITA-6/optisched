from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

from ua_parser import user_agent_parser

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from account.models import CustomUser, AuthenticationHistory
from professor.serializers import ProfessorSerializer
from django.template.defaultfilters import date


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


class AuthenticationHistorySerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()  # Return the user's full name
    user_agent_readable = (
        serializers.SerializerMethodField()
    )  # Add readable user agent field
    session_display = (
        serializers.SerializerMethodField()
    )  # Human-readable session field
    time = serializers.SerializerMethodField()  # Human-readable time field

    class Meta:
        model = AuthenticationHistory
        fields = [
            "name",
            "time",
            "session_display",
            "ip_address",
            "user_agent",
            "user_agent_readable",
        ]
        extra_kwargs = {
            "user_agent": {"write_only": True}  # Make user_agent write-only
        }

    def get_name(self, obj):
        """Return the full name of the user."""
        full_name = f"{obj.user.first_name} {obj.user.last_name}"
        return full_name.strip()

    def get_user_agent_readable(self, obj):
        """Parse the user_agent string and return human-readable details using ua-parser."""
        user_agent = user_agent_parser.Parse(obj.user_agent)

        browser = user_agent["user_agent"]
        os = user_agent["os"]
        device = user_agent["device"]

        return {
            "browser": f"{browser['family']} {browser['major']}.{browser.get('minor', '')}",
            "os": f"{os['family']} {os['major']}.{os.get('minor', '')}",
            "device": device["family"]
            if device["family"] != "Other"
            else "Unknown Device",
        }

    def get_session_display(self, obj):
        """Return the human-readable display value for the session field."""
        return obj.get_session_display()

    def get_time(self, obj):
        """Return the time in a formatted style: Day, Month, Year - Time."""
        return date(obj.time, "D, M d, Y - H:i")
