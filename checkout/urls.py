
from django.urls import path, include
from .views import payment_quote
from .api import PaymentIntentView

urlpatterns = [
    path('payment/quote', payment_quote, name='payment_quote'),
    path('payment/intent', PaymentIntentView.as_view())
]
