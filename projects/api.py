from .serializers import ProjectSerializer
from rest_framework import generics, permissions


class ProjectView(generics.GenericAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        print(self.request.data)
        return serializer.save()
