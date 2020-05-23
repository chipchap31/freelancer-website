from django.urls import path, include
from .api import LoginView, UserView, ProfileView, RegisterView, CheckUserExist
from .api import ChangePasswordView, DeleteAccount, UpdateProfile
from knox import views as knox_views

urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/user', UserView.as_view()),
    path('auth/login', LoginView.as_view(), name='account_login'),
    path('profile/<pk>', ProfileView.as_view({'get': 'retrieve'})),
    path('auth/register', RegisterView.as_view(), name='account_register'),
    path('user/check', CheckUserExist.as_view(), name='account_check'),
    path('password/change', ChangePasswordView.as_view(), name='password_update'),
    path('user/delete', DeleteAccount.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('profile/update/<int:id>', UpdateProfile.as_view())
]
