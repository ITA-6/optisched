from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admin users to add, update, or delete objects.
    """

    def has_permission(self, request, view):
        # Allow read permissions for everyone (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Check if user is admin for write permissions (POST, PUT, PATCH, DELETE)
        return request.user and request.user.is_authenticated and request.user.is_admin
