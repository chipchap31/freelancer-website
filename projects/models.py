from django.db import models
from django.contrib.auth.models import User
from checkout.models import OrderModel
from services.models import Services

from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.


class ProjectModel(models.Model):
    deadline_date = models.DateField(null=True)
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
    image1 = models.FileField(upload_to='media', null=True, blank=True)
    image2 = models.FileField(upload_to='media', null=True, blank=True)
    image3 = models.FileField(upload_to='media', null=True, blank=True)
    project_type = models.ForeignKey(
        Services, on_delete=models.CASCADE, null=False)
    project_name = models.CharField(max_length=40, null=True)
    ordered_at = models.DateField(auto_now=True)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.ordered_at}-{self.project_type.name} for {self.owner}"


class PublicProjectModel(models.Model):
    # custon model for the projects that are accepted by the clients
    image_url = models.CharField(max_length=90, null=True)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    owner_name = models.CharField(max_length=50, null=False)
    rate = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(5)])
    published_at = models.DateField(auto_now=True)
    project_name = models.CharField(max_length=50, null=False)
    feedback = models.TextField(blank=True)
    project_id = models.OneToOneField(
        ProjectModel,
        on_delete=models.CASCADE,
        related_name='project_related_to',
        null=True,
        unique=True
    )

    def __str__(self):

        return f"{self.project_name}-{self.published_at}"


class ProjectChangesModel(models.Model):
    description = models.TextField(blank=True)
    created_at = models.DateField(auto_now=True)
    project_id = models.ForeignKey(
        ProjectModel, on_delete=models.CASCADE, related_name="project_changes", null=True)
    concept_number = models.DecimalField(max_digits=5,  decimal_places=1)
