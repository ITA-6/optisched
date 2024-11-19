from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from account.models import ActivityHistory
from section.models import Section
from section.serializers import SectionSerializer

from django.utils.timezone import now


class SectionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def log_activity(self, request, action, instance=None, description=None):
        """
        Logs activity into the ActivityHistory model.

        Args:
            request (HttpRequest): The HTTP request object.
            action (str): Action type (e.g., CREATE, UPDATE, DELETE).
            instance (Model): The Section instance involved (optional).
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
            model_name="Section",
            object_id=str(instance.id) if instance else None,
            description=description,
            ip_address=ip_address,
            user_agent=user_agent,
            time=now(),
        )

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        user = request.user
        user_privilege = user.get_privilege()

        if pk:
            try:
                section = Section.objects.get(pk=pk)

                # Restrict access for sub_admin to their department's sections
                if (
                    user_privilege == "sub_admin"
                    and section.department != user.department
                ):
                    return Response(
                        {"error": "You do not have permission to access this section."},
                        status=status.HTTP_403_FORBIDDEN,
                    )

                serializer = SectionSerializer(section)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Section.DoesNotExist:
                return Response(
                    {"error": "Section not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            if user_privilege == "admin":
                sections = Section.objects.all()
            elif user_privilege == "sub_admin":
                sections = Section.objects.filter(department=user.department)
            else:
                return Response(
                    {"error": "You do not have permission to view sections."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            serializer = SectionSerializer(sections, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        department_id = request.user.department.id
        request.data["department"] = department_id
        serializer = SectionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        section = serializer.save()

        # Log the creation activity
        self.log_activity(
            request,
            action="CREATE",
            instance=section,
            description=f"Created a new section with ID {section.id}.",
        )

        data = {"message": "Section has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        department_id = request.user.department.id
        request.data["department"] = department_id

        try:
            section = Section.objects.get(pk=pk)
        except Section.DoesNotExist:
            return Response(
                {"message": "Section not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = SectionSerializer(section, data=request.data)
        serializer.is_valid(raise_exception=True)
        updated_section = serializer.save()

        # Log the update activity
        self.log_activity(
            request,
            action="UPDATE",
            instance=updated_section,
            description=f"Updated section with ID {updated_section.id}.",
        )

        data = {"message": "Section has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            section = Section.objects.get(pk=pk)
            section.delete()

            # Log the delete activity
            self.log_activity(
                request,
                action="DELETE",
                instance=section,
                description=f"Deleted section with ID {pk}.",
            )

            return Response(
                {"message": "Section has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Section.DoesNotExist:
            return Response(
                {"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND
            )
