from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Recipe
from .serializers import RecipeSerializer


@api_view(['GET'])
def health(request):
    return Response({"message": "Server is up!"})


# PUBLIC_INTERFACE
class RecipeViewSet(viewsets.ModelViewSet):
    """
    API endpoint for CRUD operations on recipes.
    """
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
