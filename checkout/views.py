from django.shortcuts import render, HttpResponse
import json
from django.http import JsonResponse

# Create your views here.
import stripe
from stripe import PaymentIntent
import os
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


def payment_intent(request):
    if request.method == 'POST':
        intent = PaymentIntent.create(
            amount=100,
            currency='eur',
            metadata={'integration_check': 'accept_a_payment'})

    return JsonResponse(intent)
