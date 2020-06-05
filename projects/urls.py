from django.urls import path, include
from .api import ProjectView, PublicProjectView, ProjectChangeView
from knox import views as knox_views

urlpatterns = [
    path('projects', ProjectView.as_view({'get': 'list'})),
    path('projects/<pk>', ProjectView.as_view({'get': 'retrieve'})),
    path('projects/public/add',
         PublicProjectView.as_view({'post': 'create'})),
    path('projects/public/fetch', PublicProjectView.as_view({'get': 'list'})),
    path('projects/change/<pk>',
         ProjectChangeView.as_view({'post': 'create'})),
    path('projects/change/<pk>/list',
         ProjectChangeView.as_view({'get': 'list'})),
    path('projects/change/<pk>/destroy',
         ProjectChangeView.as_view({'get': 'destroy'}))
]
