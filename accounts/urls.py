from django.urls import path, include
from .api import LoginView, UserView, ProfileView, RegisterView, CheckUserExist
from knox import views as knox_views

urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/user', UserView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('user/profile', ProfileView.as_view()),
    path('auth/register', RegisterView.as_view()),
    path('user/check', CheckUserExist.as_view())
]
