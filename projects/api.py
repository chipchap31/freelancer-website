from .serializers import ProjectSerializer, PublicProjectsSerializer
from rest_framework.decorators import action
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from .models import ProjectModel
from django.shortcuts import get_object_or_404


class ProjectView(viewsets.ModelViewSet):

    serializer_class = ProjectSerializer

    @action(detail=False, permissions=[permissions.IsAuthenticated])
    def list(self, request):
        queryset = self.request.user.projects.all()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    @action(detail=True, permissions=[permissions.IsAuthenticated])
    def retrieve(self, request, pk):
        queryset = get_object_or_404(ProjectModel, pk=pk)

        serializer = self.get_serializer(queryset)
        return Response(serializer.data)


class PublicProjectView(viewsets.ModelViewSet):

    @action(detail=True, permissions=[permissions.IsAuthenticated])
    def create(self, request):
        profile = self.request.user.profile.get()
        first_name = profile.first_name
        last_name = profile.last_name

        serializer = PublicProjectsSerializer
        public_project_new = serializer(data={
            **request.data,
            "owner_name": f"{first_name} {last_name}"
        })
        public_project_new.is_valid(raise_exception=True)

        # public_project_new.save(owner=self.request.user)

        project = get_object_or_404(
            ProjectModel, pk=request.data.get('project_id'))
        project.approved = True
        project.save()
        return Response(data=public_project_new.data)
