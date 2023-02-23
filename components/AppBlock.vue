<template>
  <div :class="$style.block">
    <slot />
  </div>
</template>

<style module>
.block {
  background: var(--light);
  color: var(--dark);
  padding: 1rem;
  border-radius: .5rem;
}
</style>