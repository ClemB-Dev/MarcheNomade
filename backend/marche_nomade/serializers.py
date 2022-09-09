from rest_framework import serializers
from marche_nomade.models import Stand, Market, Category


class StandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stand
        fields = '__all__'


class MarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Market
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
