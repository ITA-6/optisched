# schedule/urls.py

from django.urls import path
from .views import (
    GenerateScheduleView,
    ScheduleView,
    ProfessorScheduleView,
    ScheduleProgressView,
)

urlpatterns = [
    path("", ScheduleView.as_view(), name="schedule"),
    path("generate/", GenerateScheduleView.as_view(), name="generate_schedule"),
    path("professor/", ProfessorScheduleView.as_view(), name="professor_schedule"),
    path("progress/", ScheduleProgressView.as_view(), name="schedule_progress"),
]
