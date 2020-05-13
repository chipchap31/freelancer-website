from django.db import models
from django.contrib.auth.models import User
from checkout.models import OrderModel
from services.models import Services
# Create your models here.


class ProjectModel(models.Model):
    deadline_date = models.DateField(null=False)
    owner = models.ForeignKey(
        User, related_name="projects", on_delete=models.CASCADE, null=True)
    width = models.DecimalField(max_digits=5, decimal_places=2)
    height = models.DecimalField(max_digits=5, decimal_places=2)
    concept_amount = models.DecimalField(max_digits=5, decimal_places=2)
    colors = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    finished = models.BooleanField(default=False)
    order = models.ForeignKey(
        OrderModel, on_delete=models.SET_NULL, null=True)
    image1 = models.FileField(upload_to='media', null=True)
    image2 = models.FileField(upload_to='media', null=True, blank=True)
    image3 = models.FileField(upload_to='media', null=True, blank=True)
    project_type = models.ForeignKey(
        Services, on_delete=models.CASCADE, null=False)
    project_name = models.CharField(max_length=40, null=True)
    ordered_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.project_type.name} for {self.owner}"
