from django.urls import include, path, re_path
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/', include('accounts.urls')),
    path('api/', include('config.urls')),
    path('api/', include('checkout.urls')),
    path('api/', include('services.urls')),
    path('api/', include('projects.urls')),

    re_path(r'^.*', TemplateView.as_view(template_name='index.html'))
]
