from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Config(models.Model):
    accept_project = models.BooleanField(default=False)

    def __str__(self):
        return 'Accepting project'
