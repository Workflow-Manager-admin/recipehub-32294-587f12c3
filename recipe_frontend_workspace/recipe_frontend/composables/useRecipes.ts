import { ref } from 'vue'
import type { Ref } from 'vue'

const API_BASE = 'http://localhost:3001/api/recipes/';

export interface Recipe {
  id?: number
  title: string
  ingredients: string
  instructions: string
  cooking_time: number
  image?: string
}

export function useRecipes() {
  // State
  const recipes: Ref<Recipe[]> = ref([])
  const loading = ref(false)
  const error: Ref<null|string> = ref(null)

  // PUBLIC_INTERFACE
  async function fetchRecipes(search?: string) {
    loading.value = true
    error.value = null
    let url = API_BASE
    if (search) {
      url += `?search=${encodeURIComponent(search)}`
    }
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch recipes')
      recipes.value = await res.json()
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  // PUBLIC_INTERFACE
  async function fetchRecipe(id: number) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(API_BASE + id + '/')
      if (!res.ok) throw new Error('Recipe not found')
      return await res.json()
    } catch (e: any) {
      error.value = e.message;
      throw e
    } finally {
      loading.value = false
    }
  }

  // PUBLIC_INTERFACE
  async function createRecipe(recipe: Recipe) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      })
      if (!res.ok) throw new Error('Failed to create recipe')
      return await res.json()
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  // PUBLIC_INTERFACE
  async function updateRecipe(id: number, recipe: Recipe) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(API_BASE + id + '/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      })
      if (!res.ok) throw new Error('Failed to update recipe')
      return await res.json()
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  // PUBLIC_INTERFACE
  async function deleteRecipe(id: number) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(API_BASE + id + '/', {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete recipe')
      return true
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
    fetchRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
  }
}
