# schedule/urls.py

from django.urls import path
from .views import SectionScheduleView

urlpatterns = [
    path("sections/<int:section_id>/", SectionScheduleView.as_view(), name="list"),
]
