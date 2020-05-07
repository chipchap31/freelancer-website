
from rest_framework.response import Response
from rest_framework import status, permissions
from services.serializers import ServicesSerializer
from services.models import Services
from rest_framework.generics import GenericAPIView, CreateAPIView
from .serializers import OrderSerializer, OrderLineSerializer
from django.shortcuts import get_object_or_404
from .views import quote
import os
import stripe

from django.contrib.auth.models import User


stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


class PaymentIntentView(GenericAPIView):

    def post(self, request):
        user_data = request.data
        email = user_data.get('email')
        customer_new = stripe.Customer.create(email=email)

        payment = stripe.PaymentIntent.create(

            amount=int(quote.get_total()) * 100,
            currency='eur',
            customer=customer_new.id,
            receipt_email=email


        )

        return Response({'client_secret': payment.client_secret}, status=status.HTTP_200_OK)


class CreateOrderView(GenericAPIView):
    serializer_class = OrderLineSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        order_serializer = OrderSerializer(data=request.data)
        order_serializer.is_valid(raise_exception=True)
        order_serializer.save()
        service = get_object_or_404(
            Services, name=request.data.get('project_type'))

        order_line_serializer = self.get_serializer(data={
            'order': int(order_serializer.data.get('id')),
            'price': int(quote.get_total()),
            'service': service.id
        }

        )
        order_line_serializer.is_valid(raise_exception=True)
        order_line_serializer.save()
        print(order_line_serializer.validated_data)

        return Response({'message': True})
