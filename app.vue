<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator
        color="linear-gradient(to right, var(--light), var(--dark))"
        :height="5"
      />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
})
</script>
