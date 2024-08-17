from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from department.views import DepartmentViewSet

router = DefaultRouter()
router.register(r"api/department", DepartmentViewSet, basename="department")

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/account/", include("account.urls"), name="account"),
    path("", include(router.urls)),
]
