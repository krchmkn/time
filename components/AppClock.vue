<template>
  <div :class="$style.container">
    <template v-if="!dateString">00:00:00</template>
    <template v-else>{{ moment(dateString).format('HH:mm:ss') }}</template>
  </div>
</template>

<script setup lang="ts">
defineProps<{ dateString: string }>()
</script>

<style module>
.container {
  font-size: var(--measure-2x);
}
</style>
