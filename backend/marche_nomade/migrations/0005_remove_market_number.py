# Generated by Django 3.2 on 2022-09-12 14:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('marche_nomade', '0004_market_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='market',
            name='number',
        ),
    ]