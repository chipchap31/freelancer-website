from .models import Services
from rest_framework import viewsets
from .serializers import ServicesSerializer
from rest_framework.generics import ListAPIView


class ServicesViewSet(ListAPIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
