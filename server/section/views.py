from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from section.models import Section
from section.serializers import SectionSerializer


class SectionAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk:
            try:
                section = Section.objects.get(pk=pk)
                serializer = SectionSerializer(section)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Section.DoesNotExist:
                return Response(
                    {"error": "Section not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            sections = Section.objects.all()
            serializer = SectionSerializer(sections, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = SectionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {"message": "Section has been created.", "data": serializer.data}
        return Response(data, status=status.HTTP_201_CREATED)

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
