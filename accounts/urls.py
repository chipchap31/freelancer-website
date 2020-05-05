from django.urls import path, include
from .api import LoginView, UserView
from knox import views as knox_views

urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/user', UserView.as_view()),
    path('auth/login', LoginView.as_view())
]
