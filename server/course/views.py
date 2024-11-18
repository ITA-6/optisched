from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from course.models import Course
from course.serializers import CourseSerializer


class CourseAPIView(APIView):
    permission_classes = [IsAuthenticated]

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
        serializer.save()
        data = {"message": "Course has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        # Retrieve the existing instance of Building
        try:
            course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response(
                {"message": "Course not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Pass the instance to the serializer along with the new data
        serializer = CourseSerializer(course, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = {"message": "Course has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")

        try:
            instance = Course.objects.get(pk=pk)
            instance.delete()
            return Response(
                {"message": "Course has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Course.DoesNotExist:
            return Response(
                {"error": "Course not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
