from django.db import models

# Create your models here.


class OrderModel(models.Model):
    first_name = models.CharField(max_length=50, default='')
    last_name = models.CharField(max_length=50, default='')
    email = models.CharField(max_length=40)
    county = models.CharField(max_length=50, blank=False)
    address_line1 = models.CharField(max_length=40, blank=False)
    address_line2 = models.CharField(max_length=40, blank=False)
    city = models.CharField(max_length=40, blank=False)
    ordered_at = models.DateField(auto_now=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.id}ordered at {self.ordered_at}"
