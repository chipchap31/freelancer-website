from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from services.models import Services
from django.views.decorators.csrf import csrf_exempt
import json
from utils import price_calculator


@csrf_exempt
def payment_quote(request):
    body = json.loads(request.body)

    service = get_object_or_404(Services, name=body.get('project_type'))
    final_price = price_calculator(service, body)

    return JsonResponse({'dsd': final_price})
