# Generated by Django 3.0.4 on 2020-05-10 06:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('checkout', '0001_initial'),
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deadline_date', models.DateField()),
                ('width', models.DecimalField(decimal_places=2, max_digits=5)),
                ('height', models.DecimalField(decimal_places=2, max_digits=5)),
                ('concept_amount', models.DecimalField(decimal_places=2, max_digits=5)),
                ('colors', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='checkout.OrderModel')),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('project_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.Services')),
            ],
        ),
    ]
