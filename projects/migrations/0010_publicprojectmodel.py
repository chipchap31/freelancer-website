# Generated by Django 3.0.6 on 2020-05-28 12:46

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0009_auto_20200524_2255'),
    ]

    operations = [
        migrations.CreateModel(
            name='PublicProjectModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.CharField(max_length=50, null=True)),
                ('description', models.TextField(blank=True)),
                ('owner_name', models.CharField(max_length=50)),
                ('rate', models.FloatField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('published_at', models.DateField(auto_now=True)),
                ('project_name', models.CharField(max_length=50)),
                ('feedback', models.TextField(blank=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
