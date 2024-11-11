from django.urls import path
from .views import ConstraintUpdateView

urlpatterns = [
    path("", ConstraintUpdateView.as_view(), name="constraint-update"),
]
