from django.urls import path
from .views import MyTokenObtainPairView, RegisterView, get_routes
from rest_framework_simplejwt.views import (
    TokenRefreshView
)


urlpatterns = [
    path('', get_routes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='user_register'),
]
