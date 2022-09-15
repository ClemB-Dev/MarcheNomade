from rest_framework import serializers
from marche_nomade.models import Stand, Market, Category


class StandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stand
        fields = '__all__'


class MarketSerializer(serializers.ModelSerializer):
    stands = StandSerializer(source='stand_set', many=True)

    class Meta:
        model = Market
        fields = ('id', 'name', 'number', 'address', 'postcode',
                  'city', 'country', 'latitude', 'longitude',
                  'image', 'stands')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
