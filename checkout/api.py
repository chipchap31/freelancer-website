
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
from django.contrib.auth.models import User
import secrets
import string

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
email_sender = CustomEmail()


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
        alphabet = string.ascii_letters + string.digits
        # create a password for user that they can easily change in the future

        password = ''.join(secrets.choice(alphabet) for i in range(10))

        # check if the user exist
        if User.objects.filter(username=user_data.get('email')).exists():
            return Response({'message': 'user already exist'}, status=status.HTTP_400_BAD_REQUEST)

        # the user exist so we create a new one
        user_new = User.objects.create_user(
            username=user_data.get('email'), password=password)

        email_sender.receiver = user_data.get('email')

        email_sender.send_user_info(user_data.get('email'), password)

        return Response({'message': password}, status=status.HTTP_200_OK)
