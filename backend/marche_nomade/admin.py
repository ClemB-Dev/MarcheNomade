from django.contrib import admin
from .models import Market, Stand, Category
# Register your models here.

admin.site.register([Market, Stand, Category])
