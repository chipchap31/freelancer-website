# Generated by Django 3.0.4 on 2020-05-12 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_auto_20200512_1428'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectmodel',
            name='ordered_at',
            field=models.DateField(auto_now=True),
        ),
    ]
