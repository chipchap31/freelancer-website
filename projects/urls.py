from django.urls import path, include
from .api import ProjectView
from knox import views as knox_views

urlpatterns = [
    path('projects', ProjectView.as_view())
]
