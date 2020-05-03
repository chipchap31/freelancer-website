
from django.urls import path, include
from .views import payment_quote
from .api import PaymentIntentView
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
    path('payment/quote', payment_quote, name='payment_quote'),
    path('payment/intent', csrf_exempt(PaymentIntentView.as_view()))
]
