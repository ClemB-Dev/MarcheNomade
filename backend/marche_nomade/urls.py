from django.urls import path
from .views import (get_categories, get_markets, get_single_market, get_stands,
                    get_single_stand, get_routes,
                    )


urlpatterns = [
    path('', get_routes, name='routes'),
    path('categories/', get_categories, name='categories'),
    path('markets/', get_markets, name='markets'),
    path('markets/<pk>/', get_single_market, name='markets'),
    path('stands/', get_stands, name='stands'),
    path('stands/<pk>/', get_single_stand, name='stand'),
]
