<template>
  <NuxtErrorBoundary>
    <section :class="$style.section">
      <slot />
    </section>

    <template #error="{ error }">
      <AppBlock>
        <p>An error occurred</p>
        <button @click="handleError(error)">Try again</button>
      </AppBlock>
    </template>
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
function handleError(error: Ref) {
  error.value = null
}
</script>

<style module>
.section {
  display: grid;
  gap: var(--measure-half);
  margin-bottom: var(--measure-2x);
}

@media (min-width: 481px) {
  .section { grid-template-columns: 1fr 1fr; }
}
</style>
