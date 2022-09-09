from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField


class Market(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Stand(models.Model):
    name = models.CharField(max_length=100, blank=False)
    market = models.ForeignKey(Market, on_delete=models.CASCADE, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    phone_number = PhoneNumberField(region='FR', blank=True)
    week_days = (
                ('Lundi', 'Lundi'),
                ('Mardi', 'Mardi'),
                ('Mercredi', 'Mercredi'),
                ('Jeudi', 'Jeudi'),
                ('Vendredi', 'Vendredi'),
                ('Samedi', 'Samedi'),
                ('Dimanche', 'Dimanche'))
    opening_days = MultiSelectField(
        choices=week_days,
        default=week_days[0],
                )
    opening_hour = models.TimeField(blank=True, null=True)
    closing_hour = models.TimeField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    photo = models.ImageField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,
                                 blank=False)
    description = models.TextField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.name
