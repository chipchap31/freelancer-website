from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import OrderModel, OrderLineModel


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderModel
        fields = "__all__"

    def create(self, validated_data):

        return OrderModel.objects.create(**validated_data)


class OrderLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderLineModel
        fields = "__all__"

    def create(self, validated_data):

        return OrderLineModel.objects.create(**validated_data)
