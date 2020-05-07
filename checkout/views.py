import os
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from services.models import Services
import json
from utils import PriceCalculator


quote = PriceCalculator()


def payment_quote(request):
    user_data = json.loads(request.body)
    if request.method == "POST":
        service_data = get_object_or_404(
            Services, name=user_data.get('project_type'))
        quote.process_data(service_data, user_data)

        return JsonResponse({'quote_price': quote.get_total()})
