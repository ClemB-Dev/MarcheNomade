# Generated by Django 3.2 on 2022-09-12 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marche_nomade', '0003_auto_20220909_1254'),
    ]

    operations = [
        migrations.AddField(
            model_name='market',
            name='number',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
