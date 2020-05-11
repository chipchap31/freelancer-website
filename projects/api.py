from .serializers import ProjectSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response


class ProjectView(generics.GenericAPIView):

    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.projects.all()

    def get(self, request):
        query = self.get_queryset()
        serializer = ProjectSerializer(query, many=True)
        return Response(serializer.data)
