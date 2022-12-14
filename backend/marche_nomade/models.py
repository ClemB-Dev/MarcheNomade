from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField


class Market(models.Model):
    name = models.CharField(max_length=100)
    number = models.IntegerField(blank=True, null=True)
    address = models.CharField(max_length=100)
    postcode = models.IntegerField()
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    latitude = models.CharField(max_length=200)
    longitude = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/', blank=True, null=True)

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
    phone_number = PhoneNumberField(region='FR', blank=False)
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
    opening_hour = models.TimeField(blank=False, null=False)
    closing_hour = models.TimeField(blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    website = models.URLField(blank=False, null=False)
    photo = models.ImageField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,
                                 blank=False)
    description = models.TextField(max_length=250, blank=False, null=False)

    def __str__(self):
        return self.name
