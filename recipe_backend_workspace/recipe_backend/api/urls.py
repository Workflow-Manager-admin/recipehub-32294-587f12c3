from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import health, RecipeViewSet

router = DefaultRouter()
router.register(r'recipes', RecipeViewSet, basename='recipe')

urlpatterns = [
    path('health/', health, name='Health'),
    path('', include(router.urls)),
]
