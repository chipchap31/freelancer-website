from django.db import models

# Create your models here.


class Services(models.Model):
    name = models.CharField(max_length=254, default='')
    price = models.DecimalField(max_digits=6, decimal_places=2)
    deadline_price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField()
    default_width = models.DecimalField(max_digits=6, decimal_places=2)
    default_height = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='images')

    def __str__(self):
        return self.name
