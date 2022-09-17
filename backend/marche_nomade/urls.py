from django.urls import path
from .views import (get_categories, get_markets, get_single_market, get_stands,
                    get_single_stand, get_routes, get_user_stands
                    )


urlpatterns = [
    path('', get_routes, name='routes'),
    path('categories/', get_categories, name='categories'),
    path('markets/', get_markets, name='markets'),
    path('markets/<pk>/', get_single_market, name='markets'),
    path('stands/', get_stands, name='stands'),
    path('stands/<pk>/', get_single_stand, name='stand'),
    path('user/stands/', get_user_stands, name='stand'),
]
