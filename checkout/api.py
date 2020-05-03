
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView
from services.models import Services
from services.serializers import ServicesSerializer
from django.shortcuts import get_object_or_404
from .views import quote
import os
import stripe
from utils import CustomEmail


stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
account_info_email = CustomEmail()


class PaymentIntentView(GenericAPIView):

    def post(self, request):
        user_data = request.data

        customer_new = stripe.Customer.create(email=user_data.get('email'))

        payment = stripe.PaymentIntent.create(
            payment_method=user_data.get('payment_method_id'),
            amount=int(quote.get_total()) * 100,
            currency='eur',
            customer=customer_new.id,
            receipt_email=user_data.get('email'),
            confirmation_method='manual',
            confirm=True,
            metadata={'integration_check': 'accept_a_payment'}
        )
        if payment.status != "succeeded":

            # since the payment failed delete this customer
            stripe.Customer.delete(customer_new.id)
            return Response(data='payment error', status=status.HTTP_402_PAYMENT_REQUIRED)

        # create account here
        # save the order here
        # send email with account info
        account_info_email.receiver = user_data.get('email')

        account_info_email.send_quote()

        return Response({'message': quote.get_total()}, status=status.HTTP_200_OK)
