from django.db import models
from django.contrib.auth.models import User
from services.models import Services


class OrderModel(models.Model):
    first_name = models.CharField(max_length=50, default='')
    last_name = models.CharField(max_length=50, default='')
    email = models.CharField(max_length=40)
    county = models.CharField(max_length=50, blank=False)
    address_line1 = models.CharField(max_length=40, blank=False)
    address_line2 = models.CharField(max_length=40, blank=False)
    city = models.CharField(max_length=40, blank=False)
    ordered_at = models.DateField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.first_name} ordered at {self.ordered_at}"


class OrderLineModel(models.Model):
    price = models.DecimalField(max_digits=5, decimal_places=2)

    order = models.ForeignKey(
        OrderModel, related_name="order_line", on_delete=models.CASCADE, null=True)

    service = models.ForeignKey(
        Services,  on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.order.email} ordered {self.service.name} for the price of {self.price}"
