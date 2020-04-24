from config.models import ProjectConfig
from rest_framework import viewsets, permissions
from .serializers import ConfigSerializer
from rest_framework.generics import RetrieveAPIView, get_object_or_404


class ConfigViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAdminUser
    ]
    serializer_classes = ConfigSerializer

    def perform_create(self, serializer):
        serializer.save()


class ConfigViewSet(RetrieveAPIView):
    queryset = ProjectConfig.objects.all()
    serializer_class = ConfigSerializer
    permission_classes = (permissions.AllowAny, )
