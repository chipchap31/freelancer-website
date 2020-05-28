from django.urls import path, include
from .api import ProjectView, PublicProjectView
from knox import views as knox_views

urlpatterns = [
    path('projects', ProjectView.as_view({'get': 'list'})),
    path('projects/<pk>', ProjectView.as_view({'get': 'retrieve'})),
    path('projects/public/add',
         PublicProjectView.as_view({'post': 'create'}))
]
