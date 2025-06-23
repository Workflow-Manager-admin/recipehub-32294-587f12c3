<template>
  <v-container class="py-8">
    <h2>Add Recipe</h2>
    <RecipeForm @save="onSave" />
    <v-snackbar v-model="showError" color="red" timeout="4000">
      {{ error }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import RecipeForm from '~/components/RecipeForm.vue'
import { useRouter } from 'vue-router'
import { useRecipes } from '~/composables/useRecipes'
import { ref } from 'vue'

const { createRecipe, error } = useRecipes()
const router = useRouter()
const showError = ref(false)

async function onSave(recipe) {
  try {
    await createRecipe(recipe)
    router.push('/')
  } catch (e) {
    showError.value = true
  }
}
</script>
