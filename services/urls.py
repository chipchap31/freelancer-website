
from .api import ServicesViewSet
from django.urls import path


urlpatterns = [
    path('services/fetch', ServicesViewSet.as_view()),
]
