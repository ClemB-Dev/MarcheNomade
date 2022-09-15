from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Market, Stand, Category
from .serializers import (
                          StandSerializer,
                          MarketSerializer,
                          CategorySerializer)


@api_view(['GET'])
def get_stands(request):
    stands = Stand.objects.all()
    serializer_class = StandSerializer(stands, many=True)
    return Response(serializer_class.data)


@api_view(['GET'])
def get_markets(request):
    stands = Market.objects.all()
    serializer_class = MarketSerializer(stands, many=True)
    return Response(serializer_class.data)


@api_view(['GET'])
def get_one_market_data(request, pk):
    market = Market.objects.get(id=pk)
    serializer_class = MarketSerializer(market, many=False)
    return Response(serializer_class.data)


@api_view(['GET'])
def get_categories(request):
    stands = Category.objects.all()
    serializer_class = CategorySerializer(stands, many=True)
    return Response(serializer_class.data)


@api_view(['GET'])
def get_one_stand_data(request, pk):
    stand = Stand.objects.get(id=pk)
    serilizer = StandSerializer(stand, many=False)
    return Response(serilizer.data)


@api_view(['PUT'])
def update_stand(request, pk):
    stand = Stand.objects.get(id=pk)
    serilizer = StandSerializer(instance=stand, data=request.data)
    if serilizer.is_valid():
        serilizer.save()
    return Response(serilizer.data)


@api_view(['GET'])
def get_routes(request):
    routes = [
        '/marche_nomade/stands',
        '/marche_nomade/markets',
        '/marche_nomade/categories',
        '/marche_nomade/stands/<pk>',
        '/marche_nomade/stands/update/<pk>',
        '/marche_nomade/markets/<pk>',
    ]
    return Response(routes)
