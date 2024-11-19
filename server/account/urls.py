from django.urls import path
from account.views import (
    AccountApiView,
    CountApiView,
    LoginApiView,
    LogoutApiView,
    ActivityHistoryApiView,
    ChangePasswordApiView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("users/", AccountApiView.as_view(), name="register"),
    path(
        "change-password/",
        ChangePasswordApiView.as_view(),
        name="change_password",
    ),
    path("users/<int:pk>/", AccountApiView.as_view(), name="update_user"),
    path("login/", LoginApiView.as_view(), name="login"),
    path("logout/", LogoutApiView.as_view(), name="logout"),
    path("count/", CountApiView.as_view(), name="count"),
    path("refresh-token/", TokenRefreshView.as_view(), name="token_refresh"),
    path("login-history/", ActivityHistoryApiView.as_view(), name="login_history"),
]
