<template>
  <div :class="$style.container">
    {{ moment(dateString).format('HH:mm:ss') }}
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';

defineProps<{
  dateString: string
}>()
</script>

<style module>
.container {
  font-size: 2rem;
}
</style>

