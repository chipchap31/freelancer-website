from django.urls import include, path, re_path
from django.contrib import admin
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')


urlpatterns = [
    path('api_documentation/', schema_view),
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/', include('accounts.urls')),
    path('api/', include('config.urls')),
    path('api/', include('checkout.urls')),
    path('api/', include('services.urls')),
    path('api/', include('projects.urls')),

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)+[re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
