<template>
  <Transition :name="name" mode="out-in">
    <slot />
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  name?: string
}>()
</script>
