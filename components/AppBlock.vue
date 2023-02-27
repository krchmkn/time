<template>
  <div :class="$style.block">
    <slot />
  </div>
</template>

<style module>
.block {
  background: var(--white);
  color: var(--black);
  padding: var(--measure);
  border-radius: var(--measure-half);
  border: 4px solid var(--dark);
}
</style>