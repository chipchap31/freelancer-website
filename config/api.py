from config.models import ProjectConfig
from rest_framework import permissions
from .serializers import ConfigSerializer
from rest_framework.generics import RetrieveAPIView


class ConfigViewSet(RetrieveAPIView):
    queryset = ProjectConfig.objects.all()
    serializer_class = ConfigSerializer
    permission_classes = (permissions.AllowAny, )

