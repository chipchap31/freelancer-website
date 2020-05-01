
from django.urls import path, include
from .views import payment_quote

urlpatterns = [
    path('payment/quote', payment_quote, name='payment_intent')
]
