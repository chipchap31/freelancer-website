from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from . import views
urlpatterns = [
    path('payment-intent', csrf_exempt(views.payment_intent), name='payment_intent')
]
