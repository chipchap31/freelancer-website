from django.urls import path, include
from .api import QuoteViewSet

urlpatterns = [
    path('quote/request', QuoteViewSet.as_view())
]
