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
}
</style>