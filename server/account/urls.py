from django.urls import path
from account.views import AccountApiView, CountApiView, LoginApiView, LogoutApiView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("users/", AccountApiView.as_view(), name="register"),
    path("login/", LoginApiView.as_view(), name="login"),
    path("logout/", LogoutApiView.as_view(), name="logout"),
    path("count/", CountApiView.as_view(), name="count"),
    path("refresh-token/", TokenRefreshView.as_view(), name="token_refresh"),
]
