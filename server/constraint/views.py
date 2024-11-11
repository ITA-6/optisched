from rest_framework import generics, status
from rest_framework.response import Response
from .models import Constraint
from .serializers import ConstraintSerializer


class ConstraintUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ConstraintSerializer

    def get_object(self):
        # Retrieve or create a single Constraint instance with id=1
        obj, created = Constraint.objects.get_or_create(id=1)
        if created:
            print("New Constraint object created.")
        else:
            print("Existing Constraint object retrieved.")
        return obj

    def put(self, request, *args, **kwargs):
        # Retrieve the existing Constraint or create it if none exists
        instance = self.get_object()

        print("Request data received:", request.data)

        # Update the instance with the provided data
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            print("Constraint object updated:", serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("Errors in data validation:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
