from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from course.models import Course
from course.serializers import CourseSerializer


class CourseAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")

        if pk:
            try:
                course = Course.objects.get(pk=pk)
                serializer = CourseSerializer(course)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Course.DoesNotExist:
                return Response(
                    {"error": "Course not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            courses = Course.objects.all()
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CourseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {"message": "Course has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

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
