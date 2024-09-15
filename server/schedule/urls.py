# schedule/urls.py

from django.urls import path
from .views import GenerateScheduleView, ConfirmScheduleView, ScheduleView

urlpatterns = [
    path("generate/", GenerateScheduleView.as_view(), name="generate-schedule"),
    path("confirm/", ConfirmScheduleView.as_view(), name="confirm-schedule"),
    path("list/", ScheduleView.as_view(), name="list"),
]
