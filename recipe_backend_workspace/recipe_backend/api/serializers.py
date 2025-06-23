from rest_framework import serializers
from .models import Recipe


# PUBLIC_INTERFACE
class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for the Recipe model."""

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'ingredients', 'instructions', 'cooking_time', 'image']
