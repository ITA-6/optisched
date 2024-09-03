from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from department.views import DepartmentAPIView
from professor.views import ProfessorAPIView
from course.views import CourseAPIView
from building.views import BuildingAPIView
from section.views import SectionAPIView
from room.views import RoomAPIView

# Define a common base URL for all API endpoints
api_base_url = "api/"

urlpatterns = [
    # JWT Token Endpoints
    path(
        f"{api_base_url}token/", TokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path(
        f"{api_base_url}token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    # Account related URLs
    path(f"{api_base_url}account/", include("account.urls"), name="account"),
    # Professor Endpoints
    path(
        f"{api_base_url}professors/", ProfessorAPIView.as_view(), name="professor-list"
    ),
    path(
        f"{api_base_url}professors/<int:pk>/",
        ProfessorAPIView.as_view(),
        name="professor-detail",
    ),
    # Course Endpoints
    path(f"{api_base_url}courses/", CourseAPIView.as_view(), name="course-list"),
    path(
        f"{api_base_url}courses/<int:pk>/",
        CourseAPIView.as_view(),
        name="course-detail",
    ),
    # Building Endpoints
    path(f"{api_base_url}buildings/", BuildingAPIView.as_view(), name="building-list"),
    path(
        f"{api_base_url}buildings/<int:pk>/",
        BuildingAPIView.as_view(),
        name="building-detail",
    ),
    # Section Endpoints
    path(f"{api_base_url}sections/", SectionAPIView.as_view(), name="section-list"),
    path(
        f"{api_base_url}sections/<int:pk>/",
        SectionAPIView.as_view(),
        name="section-detail",
    ),
    # Room Endpoints
    path(f"{api_base_url}rooms/", RoomAPIView.as_view(), name="room-list"),
    path(f"{api_base_url}rooms/<int:pk>/", RoomAPIView.as_view(), name="room-detail"),
    # Department Endpoints
    path(
        f"{api_base_url}departments/",
        DepartmentAPIView.as_view(),
        name="department-list",
    ),
    path(
        f"{api_base_url}departments/<int:pk>/",
        DepartmentAPIView.as_view(),
        name="department-detail",
    ),
]
