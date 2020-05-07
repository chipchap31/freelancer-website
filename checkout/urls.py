
from django.urls import path, include
from .views import payment_quote
from .api import PaymentIntentView, CreateOrderView

urlpatterns = [
    path('payment/quote', payment_quote, name='payment_quote'),
    path('payment/intent', PaymentIntentView.as_view()),
    path('order/new', CreateOrderView.as_view())
]
