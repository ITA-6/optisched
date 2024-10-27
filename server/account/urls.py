from django.urls import path
from account.views import (
    AccountApiView,
    CountApiView,
    LoginApiView,
    LogoutApiView,
    LoginHistoryApiView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("users/", AccountApiView.as_view(), name="register"),
    path("users/<int:pk>/", AccountApiView.as_view(), name="update_user"),
    path("login/", LoginApiView.as_view(), name="login"),
    path("logout/", LogoutApiView.as_view(), name="logout"),
    path("count/", CountApiView.as_view(), name="count"),
    path("refresh-token/", TokenRefreshView.as_view(), name="token_refresh"),
    path("login-history/", LoginHistoryApiView.as_view(), name="login-history"),
]
