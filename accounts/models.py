from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class ProfileModel(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.CharField(max_length=40, blank=False)
    mobile = models.CharField(max_length=40)
    password_changed = models.DecimalField(
        default=0, max_digits=1, decimal_places=0)
    address_line1 = models.CharField(max_length=40, blank=False)
    address_line2 = models.CharField(max_length=40, blank=True)
    city = models.CharField(max_length=40, blank=False)
    county = models.CharField(max_length=40, blank=False)
    owner = models.ForeignKey(
        User, related_name="profile", on_delete=models.CASCADE, null=True)
