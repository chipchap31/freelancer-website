from django.urls import include, path, re_path
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('api/', include('config.urls')),
    path('api/', include('checkout.urls')),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html'))
]
