from django.urls import path, include
from .api import LoginView
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/login', LoginView.as_view())
]
