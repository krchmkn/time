<template>
  <NuxtLink to="/" :class="[$style.logo, 'unselectable']">
    Ti<span :class="$style.element">:</span>me
  </NuxtLink>
</template>

<style module>
.logo {
  display: inline-flex;
  text-decoration: none;
  text-transform: uppercase;
  font-size: var(--measure-2x);
}

.element {
  display: inline-flex;
  animation: blink 2s ease infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
