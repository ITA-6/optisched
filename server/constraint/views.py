from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from account.models import ActivityHistory
from constraint.models import Constraint
from constraint.serializers import ConstraintSerializer

from django.utils.timezone import now


class ConstraintUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ConstraintSerializer

    def log_activity(self, request, action, instance, description):
        """
        Logs activity into the ActivityHistory model.

        Args:
            request (HttpRequest): The HTTP request object.
            action (str): Action type (e.g., UPDATE).
            instance (Model): The Constraint instance involved.
            description (str): Detailed description of the action.
        """
        user = request.user if request.user.is_authenticated else None
        ip_address = (
            request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0]
            if "HTTP_X_FORWARDED_FOR" in request.META
            else request.META.get("REMOTE_ADDR")
        )
        user_agent = request.META.get("HTTP_USER_AGENT", "")

        ActivityHistory.objects.create(
            user=user,
            action=action,
            model_name="Constraint",
            object_id=str(instance.id),
            description=description,
            ip_address=ip_address,
            user_agent=user_agent,
            time=now(),
        )

    def get_object(self):
        """
        Retrieve or create a single Constraint instance with id=1.
        """
        obj, created = Constraint.objects.get_or_create(id=1)
        if created:
            print("New Constraint object created.")
        else:
            print("Existing Constraint object retrieved.")
        return obj

    def put(self, request, *args, **kwargs):
        """
        Handle PUT requests to update the Constraint instance.
        """
        # Retrieve the existing Constraint or create it if none exists
        instance = self.get_object()

        print("Request data received:", request.data)

        # Update the instance with the provided data
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            updated_instance = serializer.save()
            print("Constraint object updated:", serializer.validated_data)

            # Log the activity
            self.log_activity(
                request,
                action="UPDATE",
                instance=updated_instance,
                description=f"Updated Constraint object with ID {updated_instance.id}.",
            )

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("Errors in data validation:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
