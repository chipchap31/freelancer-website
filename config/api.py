from config.models import Config
from rest_framework import viewsets, permissions
from .serializers import ConfigSerializer
from rest_framework.generics import RetrieveAPIView, get_object_or_404


class ConfigViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAdminUser
    ]
    serializer_classes = ConfigSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ConfigViewSet(RetrieveAPIView):

    serializer_class = ConfigSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        return Config.objects.all()[0]

    def get_object(self):
        queryset = self.get_queryset()

        return queryset
