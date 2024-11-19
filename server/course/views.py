from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from account.models import ActivityHistory
from course.models import Course
from course.serializers import CourseSerializer

from django.utils.timezone import now


class CourseAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def log_activity(self, request, action, instance=None, description=None):
        """
        Logs activity into the ActivityHistory model.

        Args:
            request (HttpRequest): The HTTP request object.
            action (str): Action type (e.g., CREATE, UPDATE, DELETE).
            instance (Model): The Course instance involved (optional).
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
            model_name="Course",
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
            # Retrieve a single course by primary key
            try:
                course = Course.objects.get(pk=pk)

                # Restrict sub_admin access to their department's courses
                if (
                    user_privilege == "sub_admin"
                    and course.department != user.department
                ):
                    return Response(
                        {"error": "You do not have permission to access this course."},
                        status=status.HTTP_403_FORBIDDEN,
                    )

                serializer = CourseSerializer(course)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Course.DoesNotExist:
                return Response(
                    {"error": "Course not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            # Retrieve all courses based on user privilege
            if user_privilege == "admin":
                courses = Course.objects.all()
            elif user_privilege == "sub_admin":
                courses = Course.objects.filter(department=user.department)
            else:
                return Response(
                    {"error": "You do not have permission to view courses."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CourseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        course = serializer.save()

        # Log the creation activity
        self.log_activity(
            request,
            action="CREATE",
            instance=course,
            description=f"Created a new course with ID {course.id}.",
        )

        data = {"message": "Course has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        # Retrieve the existing instance of Course
        try:
            course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response(
                {"message": "Course not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Pass the instance to the serializer along with the new data
        serializer = CourseSerializer(course, data=request.data)
        serializer.is_valid(raise_exception=True)
        updated_course = serializer.save()

        # Log the update activity
        self.log_activity(
            request,
            action="UPDATE",
            instance=updated_course,
            description=f"Updated course with ID {updated_course.id}.",
        )

        data = {"message": "Course has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")

        try:
            course = Course.objects.get(pk=pk)
            course.delete()

            # Log the delete activity
            self.log_activity(
                request,
                action="DELETE",
                instance=course,
                description=f"Deleted course with ID {pk}.",
            )

            return Response(
                {"message": "Course has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Course.DoesNotExist:
            return Response(
                {"error": "Course not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
