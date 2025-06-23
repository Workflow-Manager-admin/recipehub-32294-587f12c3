<template>
  <v-container class="py-8">
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchTerm"
          label="Search recipes"
          prepend-inner-icon="mdi-magnify"
          clearable
          density="comfortable"
          color="primary"
          @keydown.enter="performSearch"
        />
      </v-col>
      <v-col cols="12" md="6" class="text-end">
        <v-btn color="secondary" to="/add" variant="outlined">Add Recipe</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="recipe in recipes"
        :key="recipe.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="recipe-card">
          <v-img
            :src="recipe.image || fallbackImg"
            height="180"
            cover
            class="rounded-t"
          />
          <v-card-title>
            {{ recipe.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ recipe.cooking_time }} min
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="viewRecipe(recipe)">View</v-btn>
            <v-btn color="accent" @click="editRecipe(recipe)" variant="tonal">Edit</v-btn>
            <v-btn color="secondary" @click="deleteRecipeClick(recipe)" variant="tonal">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <RecipeDetailDialog v-if="selectedRecipe" :recipe="selectedRecipe" @close="selectedRecipe = null" />
    <v-snackbar v-model="showError" color="red" timeout="4000">
      {{ error }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRecipes } from '~/composables/useRecipes'
import RecipeDetailDialog from '~/components/RecipeDetailDialog.vue'
import { useRouter } from 'vue-router'

const { recipes, fetchRecipes, deleteRecipe, error } = useRecipes()
const searchTerm = ref('')
const selectedRecipe = ref(null)
const showError = ref(false)
const router = useRouter()
const fallbackImg = '/images/recipe-fallback.jpg'

watchEffect(() => {
  if (recipes.value.length === 0) fetchRecipes()
})

function performSearch() {
  fetchRecipes(searchTerm.value)
}

function viewRecipe(recipe) {
  selectedRecipe.value = recipe
}
function editRecipe(recipe) {
  router.push(`/edit/${recipe.id}`)
}

async function deleteRecipeClick(recipe) {
  if (confirm(`Delete recipe "${recipe.title}"?`)) {
    try {
      await deleteRecipe(recipe.id)
      fetchRecipes()
    } catch (e) {
      showError.value = true
    }
  }
}
</script>

<style scoped>
.recipe-card {
  transition: box-shadow 0.2s;
  cursor: pointer;
}
.recipe-card:hover {
  box-shadow: 0 8px 24px 0 rgba(76,175,80,0.11);
}
</style>
