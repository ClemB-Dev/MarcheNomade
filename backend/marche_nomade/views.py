from rest_framework.response import Response
from rest_framework.decorators import api_view  # , permission_classes
# from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Market, Stand, Category
from .serializers import (
                          StandSerializer,
                          MarketSerializer,
                          CategorySerializer)

# @permission_classes([IsAuthenticated])

# @api_view(['GET'])
# def get_stands(request):
#     user = request.user
#     stands = user.stand_set.all()
#     serializer_class = StandSerializer(stands, many=True)
#     return Response(serializer_class.data)


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
def get_categories(request):
    stands = Category.objects.all()
    serializer_class = CategorySerializer(stands, many=True)
    return Response(serializer_class.data)


@api_view(['GET'])
def get_routes(request):
    routes = [
        '/marche_nomade/stands',
        '/marche_nomade/markets',
        '/marche_nomade/stands',
    ]
    return Response(routes)
