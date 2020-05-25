
from django.urls import path, include

from .api import PaymentIntentView, CreateOrderView, PaymentQuoteView

urlpatterns = [
    path('payment/quote', PaymentQuoteView.as_view(), name='payment_quote'),
    path('payment/intent', PaymentIntentView.as_view(), name='payment_intent'),
    path('order/new', CreateOrderView.as_view(), name='order_new')
]
