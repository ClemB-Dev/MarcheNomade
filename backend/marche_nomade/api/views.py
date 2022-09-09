from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view  # , permission_classes
from rest_framework.permissions import AllowAny  # , IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializers import (MyTokenObtainPairSerializer,
                          RegisterSerializer,
                          )


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permissions = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/register',
    ]
    return Response(routes)
