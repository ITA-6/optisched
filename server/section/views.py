from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from section.models import Section
from section.serializers import SectionSerializer


class SectionAPIView(APIView):
    permission_classes = [IsAuthenticated]

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
            # Retrieve all sections based on user privilege
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
        serializer.save()
        data = {"message": "Section has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        department_id = request.user.department.id
        request.data["department"] = department_id
        # Retrieve the existing instance of Building
        try:
            course = Section.objects.get(pk=pk)
        except Section.DoesNotExist:
            return Response(
                {"message": "Section not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Pass the instance to the serializer along with the new data
        serializer = SectionSerializer(course, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = {"message": "Section has been updated.", "data": serializer.data}
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            instance = Section.objects.get(pk=pk)
            instance.delete()
            return Response(
                {"message": "Section has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Section.DoesNotExist:
            return Response(
                {"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND
            )
