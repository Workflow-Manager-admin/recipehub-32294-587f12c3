<template>
  <v-dialog v-model="internalOpen" max-width="520">
    <v-card>
      <v-card-title>
        {{ recipe.title }}
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-img
        :src="recipe.image || fallbackImg"
        height="180"
        cover
        class="rounded-t"
      />
      <v-card-text>
        <b>Cooking time:</b> {{ recipe.cooking_time }} min
        <br />
        <b>Ingredients:</b>
        <div v-text="recipe.ingredients" style="white-space: pre-line;" />
        <br />
        <b>Instructions:</b>
        <div v-text="recipe.instructions" style="white-space: pre-line;" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="tonal" @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps({
  recipe: { type: Object, required: true },
})
const emits = defineEmits(['close'])

const internalOpen = ref(true)
const fallbackImg = '/images/recipe-fallback.jpg'

watch(internalOpen, (val) => {
  if (!val) emits('close')
})

function close() {
  internalOpen.value = false
}
</script>
