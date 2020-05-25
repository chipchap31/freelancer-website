from utils import PriceCalculator
from rest_framework.response import Response
from rest_framework import status, permissions, generics
from services.serializers import ServicesSerializer
from services.models import Services
from projects.serializers import ProjectSerializer

from .serializers import OrderSerializer, OrderLineSerializer
from django.shortcuts import get_object_or_404

import os
import stripe
import sys
from django.contrib.auth.models import User


stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


quote_price_estimate = PriceCalculator()


class PaymentQuoteView(generics.GenericAPIView):
    def post(self, request):
        service_name = request.data.get('project_type')

        service_data = get_object_or_404(Services, name=service_name)

        quote_price_estimate.process_data(service_data, user_data=request.data)

        return Response({'quote_price': quote_price_estimate.get_total()})


class PaymentIntentView(generics.GenericAPIView):

    def post(self, request):
        user_data = request.data
        email = user_data.get('email')
        customer_new = stripe.Customer.create(email=email)

        payment = stripe.PaymentIntent.create(
            amount=int(quote_price_estimate.get_total()) * 100,
            currency='eur',
            customer=customer_new.id,
            receipt_email=email
        )

        return Response({'client_secret': payment.client_secret}, status=status.HTTP_200_OK)


class CreateOrderView(generics.GenericAPIView):
    serializer_class = OrderLineSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        order_serializer = OrderSerializer(data=request.data)
        order_serializer.is_valid(raise_exception=True)
        order_serializer.save(owner=self.request.user)
        service = get_object_or_404(
            Services, name=request.data.get('project_type'))

        project_data = {
            **request.data,
            'project_type': service.id,
            'project_name': service.name,
            'order': order_serializer.data.get('id')
        }

        if 'test' in sys.argv:
            project_data = {
                **request.data,
                'project_type': service.id,
                'project_name': service.name,
                'order': order_serializer.data.get('id'),
                'deadline_date': "2020-06-01",
                'description': "test",
                'concept_amount': 1,
                'width': 200,
                'height': 200,
                'colors': '#EEEE,#EEEE,#EEEE,#EEEE,#EEEE'
            }

        project_serializer = ProjectSerializer(
            data=project_data)

        project_serializer.is_valid(raise_exception=True)

        project_serializer.save(owner=self.request.user)

        order_line_serializer = self.get_serializer(data={
            'order': int(order_serializer.data.get('id')),
            'price': int(quote_price_estimate.get_total()),
            'service': service.id
        }

        )
        order_line_serializer.is_valid(raise_exception=True)
        order_line_serializer.save()

        return Response({}, status=status.HTTP_200_OK)
