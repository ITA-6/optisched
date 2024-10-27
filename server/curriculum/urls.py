from django.urls import path
from curriculum.views import CurriculumAPIView

urlpatterns = [
    path("", CurriculumAPIView.as_view(), name="curriculum_api"),
]
