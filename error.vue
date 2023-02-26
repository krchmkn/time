<template>
  <section class="container">
    <h1>{{ error.statusCode }}</h1>
    <h2>{{ error.statusMessage }}</h2>

    <button @click="handleError">Try again</button>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: ObjectItem
}>()

useHead({
  title: `${props.error.statusCode} ${props.error.statusMessage}`
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.container {
  display: grid;
  place-content: center;
  place-items: center;
  height: 100vh;
  padding: var(--measure);
  text-align: center;
}
</style>