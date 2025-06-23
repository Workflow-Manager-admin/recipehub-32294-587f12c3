from django.db import models


# PUBLIC_INTERFACE
class Recipe(models.Model):
    """
    Recipe model representing a cooking recipe.
    """
    title = models.CharField(max_length=200, help_text="Title of the recipe")
    ingredients = models.TextField(help_text="Ingredients for the recipe")
    instructions = models.TextField(help_text="Cooking instructions")
    cooking_time = models.PositiveIntegerField(help_text="Cooking time in minutes")
    image = models.URLField(
        max_length=500, blank=True, null=True, help_text="Image URL or file path for the recipe"
    )

    def __str__(self):
        return self.title
