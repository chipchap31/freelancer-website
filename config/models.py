from django.db import models

# Create your models here.


class ProjectConfig(models.Model):
    accept_project = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return 'Check if accepting project'
