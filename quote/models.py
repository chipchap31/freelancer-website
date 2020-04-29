from django.db import models

# Create your models here.


class QuoteModel(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    requested_at = models.DateField()
    email = models.CharField(max_length=50)
    price = models.CharField(max_length=50)

    def __str__(self):
        return "{0}-{1}-{2}".format(self.email, self.price, self.requested_at)
