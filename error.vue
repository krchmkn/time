<template>
  error{{ error }}
  <section class="container">
    <h1>{{ error.statusCode }}</h1>
    <h2>{{ error.statusMessage }}</h2>

    <button @click="handleError">Go to main page</button>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  error: { [key: string]: string }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.container {
  display: grid;
  place-content: center;
  place-items: center;
  height: 100vh;
  padding: 1rem;
}
</style>