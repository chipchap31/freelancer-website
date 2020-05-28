from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import ProjectModel, PublicProjectModel


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectModel
        fields = "__all__"

    def create(self, validated_data):

        return ProjectModel.objects.create(**validated_data)


class PublicProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicProjectModel
        fields = "__all__"

    def create(self, validated_data):

        return PublicProjectModel.objects.create(**validated_data)
