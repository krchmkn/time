<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style module>
.container {
  display: block;
  position: relative;
  background-color: var(--light);
  border-radius: var(--measure-half);
  overflow: hidden;
}
.container::after {
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