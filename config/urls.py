from rest_framework import routers
from .api import ConfigViewSet
from django.urls import path


urlpatterns = [
    path('config/<pk>', ConfigViewSet.as_view()),
]
