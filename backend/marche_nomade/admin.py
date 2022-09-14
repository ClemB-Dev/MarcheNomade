from django.contrib import admin
from .models import Market, Stand, Category
# Register your models here.

class MarketAdmin(admin.ModelAdmin):
    list_display = ['name', 'city']


class StandAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'market']


class CategoriesAdmin(admin.ModelAdmin):
    list_display = ['name']

admin.site.register(Market, MarketAdmin)
admin.site.register(Stand, StandAdmin)
admin.site.register(Category, CategoriesAdmin)
