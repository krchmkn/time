<template>
  <NuxtLink to="/" :class="$style.logo">
    Ti<span :class="$style.element">:</span>me
  </NuxtLink>
</template>

<style module>
.logo {
  display: inline-flex;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 2rem;
  color: var(--dark);
}

.element {
  display: inline-flex;
  animation: blink 1s ease infinite;
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
