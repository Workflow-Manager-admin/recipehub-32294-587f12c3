<template>
  <v-app>
    <v-app-bar color="primary" dark flat>
      <v-toolbar-title>RecipeHub</v-toolbar-title>
      <v-spacer />
      <router-link to="/" class="nav-link">Recipes</router-link>
      <v-btn color="secondary" class="ml-4" to="/add" variant="outlined">Add Recipe</v-btn>
    </v-app-bar>
    <v-main class="bg-app-light">
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// No additional logic, purely layout.
</script>

<style scoped>
.bg-app-light {
  min-height: 100vh;
  background: #fafafa;
}
.nav-link {
  color: white;
  text-decoration: none;
  margin-right: 12px;
  font-weight: 500;
}
.nav-link.router-link-exact-active {
  color: #ff9800;
}
</style>
