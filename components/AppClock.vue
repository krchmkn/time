<template>
  <AppTransition>
    <AppSkeletonLoader v-if="pending" style="height: 2.4em;" />
    <template v-else>
      <div :class="$style.container">
        {{ !dateString ? '--:--:--' : moment(dateString).format('HH:mm:ss') }}
      </div>
    </template>
  </AppTransition>
</template>

<script setup lang="ts">
defineProps<{
  dateString: string | undefined
  pending?: boolean
}>()
</script>

<style module>
.container {
  font-size: var(--measure-2x);
}
</style>
