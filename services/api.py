from .models import Services
from rest_framework import viewsets
from .serializers import ServicesSerializer
from rest_framework.generics import ListAPIView, get_object_or_404


class ServicesViewSet(ListAPIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
