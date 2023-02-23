<template>
  <div :class="$style.container">
    <div
      v-for="height in heights"
      :style="{ height }"
      :class="$style.box"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  heights: string[]
}>()
</script>

<style module>
.box {
  display: block;
  height: 1em;
  position: relative;
  background-color: #f5c995;
  margin-top: .5rem;
  overflow: hidden;
  border-radius: .5em;
}

.box:first-child {
  margin-top: 0;
}

.box::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to right,
    rgba(88, 59, 135, 0) 0,
    rgba(88, 59, 135, 0.2) 20%,
    rgba(88, 59, 135, 0.5) 60%,
    rgba(88, 59, 135, 0)
  );
  animation: shimmer 2s infinite;
  content: "";
}

@keyframes shimmer {
  from {
    transform: translate3d(-100%, 0, 0);
  }

  to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>