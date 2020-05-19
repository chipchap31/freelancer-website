from .serializers import ProjectSerializer
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from .models import ProjectModel

# class ProjectView(generics.GenericAPIView):

#     serializer_class = ProjectSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return user.projects.all()

#     def get(self, request):
#         query = self.get_queryset()
#         serializer = ProjectSerializer(query, many=True)
#         return Response(serializer.data)


class ProjectView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectSerializer

    def list(self, request):
        queryset = ProjectModel.objects.all()
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk):
        queryset = ProjectModel.objects.get(pk=pk)
        print(queryset)
        serializer = ProjectSerializer(queryset)
        return Response(serializer.data)
