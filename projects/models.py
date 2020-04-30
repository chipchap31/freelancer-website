from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class ProjectModel(models.Model):
    final_product = models.FileField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    width = models.DecimalField(max_digits=5, decimal_places=2)
    height = models.DecimalField(max_digits=5, decimal_places=2)
    concept_amount = models.DecimalField(max_digits=5, decimal_places=2)
    colors = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return f"{self.owner}"
