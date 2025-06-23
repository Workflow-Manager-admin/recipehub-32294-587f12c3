<template>
  <v-container class="py-8">
    <h2>Edit Recipe</h2>
    <RecipeForm :recipe="recipe" @save="onSave" />
    <v-snackbar v-model="showError" color="red" timeout="4000">
      {{ error }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import RecipeForm from '~/components/RecipeForm.vue'
import { useRouter, useRoute } from 'vue-router'
import { useRecipes } from '~/composables/useRecipes'
import { ref, onMounted } from 'vue'

const { fetchRecipe, updateRecipe, error } = useRecipes()
const router = useRouter()
const route = useRoute()
const showError = ref(false)
const recipe = ref(null)

onMounted(async () => {
  recipe.value = await fetchRecipe(Number(route.params.id))
})

async function onSave(data) {
  try {
    await updateRecipe(Number(route.params.id), data)
    router.push('/')
  } catch (e) {
    showError.value = true
  }
}
</script>
