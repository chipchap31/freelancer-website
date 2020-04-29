from django.db import models

# Create your models here.


class QuoteModel(models.Model):
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50,  blank=True)
    requested_at = models.DateField(auto_now=True)
    email = models.CharField(max_length=50, )
    quote_price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return "{0}-{1}-{2}".format(self.email, self.price, self.requested_at)
