from rest_framework import serializers
from config.models import ProjectConfig


class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectConfig
        fields = '__all__'
