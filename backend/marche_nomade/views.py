from math import perm
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Market, Stand, Category
from rest_framework.parsers import JSONParser
from .serializers import (
                          StandSerializer,
                          MarketSerializer,
                          CategorySerializer)


@api_view(['GET'])
def get_categories(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_markets(request):
    if request.method == 'GET':
        markets = Market.objects.all()
        serializer = MarketSerializer(markets, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_single_market(request, pk):
    if request.method == 'GET':
        market = Market.objects.get(id=pk)
        serializer = MarketSerializer(market, many=False)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def get_stands(request):
    if request.method == 'GET':
        stands = Stand.objects.all()
        serializer = StandSerializer(stands, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = StandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def get_single_stand(request, pk):
    if request.method == 'GET':
        stands = Stand.objects.get(id=pk)
        serializer = StandSerializer(stands, many=False)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = request.data
        stand = Stand.objects.get(id=pk)
        serializer = StandSerializer(instance=stand, data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    elif request.method == 'DELETE':
        stand = Stand.objects.get(id=pk)
        stand.delete()
        return Response('Stand has been deleted!')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_stands(request):
    user = request.user
    stands = user.stand_set.all()
    serializer = StandSerializer(stands, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/categories/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of categories'
        },
        {
            'Endpoint': '/markets/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of markets'
        },
        {
            'Endpoint': '/market/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single market object'
        },
        {
            'Endpoint': '/stands/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of stands'
        },
        {
            'Endpoint': '/stands/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single stand object'
        },
        {
            'Endpoint': '/stands/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new stand object with data sent in post request'
        },
        {
            'Endpoint': '/stands/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing stand object with data sent in post request'
        },
        {
            'Endpoint': '/stands/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting stand'
        },
        {
            'Endpoint': '/user/stands/',
            'method': 'GET',
            'body': None,
            'description': 'Returns stands belonging to connected user'
        },
    ]
    return Response(routes)
