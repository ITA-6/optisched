from django.urls import path
from account.views import RegisterApiView, CountApiView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("register/", RegisterApiView.as_view(), name="register"),
    path("login/", obtain_auth_token, name="login"),
    path("count/", CountApiView.as_view(), name="count"),
]
