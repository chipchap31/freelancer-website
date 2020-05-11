
from django.urls import path, include
from .views import payment_quote
from .api import PaymentIntentView, CreateOrderView, PaymentQuoteView

urlpatterns = [
    path('payment/quote', PaymentQuoteView.as_view()),
    path('payment/intent', PaymentIntentView.as_view()),
    path('order/new', CreateOrderView.as_view())
]
