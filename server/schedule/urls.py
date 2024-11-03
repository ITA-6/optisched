# schedule/urls.py

from django.urls import path
from .views import GenerateScheduleView

urlpatterns = [
    # path("", ScheduleAPIView.as_view(), name="schedule"),
    path("", GenerateScheduleView.as_view(), name="schedule"),
]
