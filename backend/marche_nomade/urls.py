from django.urls import path
from .views import (get_categories, get_markets, get_one_market_data,
                    get_one_stand_data, get_stands, get_routes)


urlpatterns = [
    path('', get_routes),
    path('stands/', get_stands),
    path('categories/', get_categories),
    path('markets/', get_markets),
    path('stands/<pk>/', get_one_stand_data),
    path('markets/<pk>/', get_one_market_data),
]
