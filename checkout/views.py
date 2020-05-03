import os
from stripe import PaymentIntent
import stripe
from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from services.models import Services
from django.views.decorators.csrf import csrf_exempt
import json
from utils import PriceCalculator
from django.http import HttpResponse
from django.http.response import HttpResponseServerError

quote = PriceCalculator()

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


@csrf_exempt
def payment_quote(request):
    user_data = json.loads(request.body)
    if request.method == "POST":
        service_data = get_object_or_404(
            Services, name=user_data.get('project_type'))
        quote.process_data(service_data, user_data)

        return JsonResponse({'quote_price': quote.get_total()})

