from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

from ua_parser import user_agent_parser

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from account.models import CustomUser, ActivityHistory
from professor.serializers import ProfessorSerializer
from django.template.defaultfilters import date
from django.utils.timezone import localtime


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["email"] = user.email
        token["user_type"] = user.user_type
        token["first_name"] = user.first_name
        token["middle_name"] = user.middle_name
        token["last_name"] = user.last_name
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


class ActivityHistorySerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()  # User's full name
    user_agent_readable = (
        serializers.SerializerMethodField()
    )  # Human-readable user agent details
    action_display = serializers.SerializerMethodField()  # Human-readable action field
    time = serializers.SerializerMethodField()  # Formatted time

    class Meta:
        model = ActivityHistory
        fields = [
            "name",
            "time",
            "action_display",
            "ip_address",
            "user_agent",
            "user_agent_readable",
            "model_name",
            "object_id",
            "description",
        ]
        extra_kwargs = {
            "user_agent": {"write_only": True},  # Hide user_agent in GET responses
        }

    def get_name(self, obj):
        """
        Return the full name of the user.
        If first or last name is missing, fallback to username.
        """
        if obj.user.first_name or obj.user.last_name:
            return f"{obj.user.first_name} {obj.user.last_name}".strip()
        return obj.user.username

    def get_user_agent_readable(self, obj):
        """
        Parse the user_agent string and return human-readable details.
        """
        try:
            user_agent = user_agent_parser(obj.user_agent)
            browser = f"{user_agent.browser.family} {user_agent.browser.version_string}"
            os = f"{user_agent.os.family} {user_agent.os.version_string}"
            device = (
                user_agent.device.family
                if user_agent.device.family != "Other"
                else "Unknown Device"
            )
            return {"browser": browser, "os": os, "device": device}
        except Exception:
            return {"browser": "Unknown", "os": "Unknown", "device": "Unknown"}

    def get_action_display(self, obj):
        """
        Return the human-readable value for the action field.
        """
        return dict(ActivityHistory.ACTION_TYPES).get(obj.action, obj.action)

    def get_time(self, obj):
        """
        Format the time in a user-friendly manner.
        Adjusts to the local timezone if `USE_TZ` is enabled.
        """
        local_time = localtime(obj.time)
        return date(local_time, "D, M d, Y - H:i")


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        """Validate old_password, and check new_password and confirm_password match and ensure new_password is different."""
        user = self.context["request"].user

        # Validate old_password
        if not check_password(data.get("old_password"), user.password):
            raise serializers.ValidationError({"message": "Old password is incorrect."})

        # Validate new_password and confirm_password match
        if data.get("new_password") != data.get("confirm_password"):
            raise serializers.ValidationError(
                {"message": "New password and confirm password do not match."}
            )

        # Ensure new_password is different from old_password
        if check_password(data.get("new_password"), user.password):
            raise serializers.ValidationError(
                {"message": "New password cannot be the same as the old password."}
            )

        return data

    def save(self, **kwargs):
        """Update the user's password."""
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user
