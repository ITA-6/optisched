# schedule/urls.py

from django.urls import path
from .views import (
    GenerateScheduleView,
    ScheduleView,
    ProfessorScheduleView,
    ScheduleProgressView,
    GanttDataView,
    FixConflictScheduleView,
    ManualScheduleFix,
)

urlpatterns = [
    path("", ScheduleView.as_view(), name="schedule"),
    path("generate/", GenerateScheduleView.as_view(), name="generate_schedule"),
    path("professor/", ProfessorScheduleView.as_view(), name="professor_schedule"),
    path("progress/", ScheduleProgressView.as_view(), name="schedule_progress"),
    path("gantt/", GanttDataView.as_view(), name="gantt"),
    path("fix-conflicts/", FixConflictScheduleView.as_view(), name="fix_conflict"),
    path("manual-fix/", ManualScheduleFix.as_view(), name="manual_fix"),
]
