<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="form.title"
      label="Title"
      :rules="[v => !!v || 'Please enter a title']"
      required
      color="primary"
      class="mb-3"
    />
    <v-textarea
      v-model="form.ingredients"
      label="Ingredients"
      :rules="[v => !!v || 'Please enter ingredients']"
      rows="3"
      auto-grow
      required
      color="primary"
      class="mb-3"
    />
    <v-textarea
      v-model="form.instructions"
      label="Instructions"
      :rules="[v => !!v || 'Please enter instructions']"
      rows="3"
      auto-grow
      required
      color="primary"
      class="mb-3"
    />
    <v-text-field
      v-model="form.cooking_time"
      label="Cooking Time (minutes)"
      type="number"
      min="1"
      :rules="[v => v > 0 || 'Must be positive']"
      required
      color="primary"
      class="mb-3"
    />
    <v-text-field
      v-model="form.image"
      label="Image URL (optional)"
      color="primary"
      class="mb-4"
    />
    <v-row>
      <v-col>
        <v-btn color="primary" type="submit">
          Save
        </v-btn>
        <v-btn color="secondary" @click="resetForm" class="ml-3" variant="tonal">
          Reset
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'

const props = defineProps({
  recipe: {
    type: Object,
    default: null
  }
})
const emits = defineEmits(['save'])

const emptyRecipe = {
  title: '',
  ingredients: '',
  instructions: '',
  cooking_time: 10,
  image: ''
}
const form = reactive({ ...emptyRecipe })

watch(
  () => props.recipe,
  (val) => {
    Object.assign(form, val ? { ...val } : emptyRecipe)
  },
  { immediate: true }
)

function submit() {
  emits('save', { ...form })
}
function resetForm() {
  Object.assign(form, props.recipe ? { ...props.recipe } : emptyRecipe)
}
</script>
