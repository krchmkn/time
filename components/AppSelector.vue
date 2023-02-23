<template>
  <select
    :class="$style.select"
    v-model="value"
  >
    <option selected disabled value="">{{ title }}</option>
    <option v-for="option in options" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  options: Array<string>
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<style module>
.title {
  padding-bottom: 1rem;
}

.select {
  appearance: none;
  padding: .5rem 1rem;
  border-radius: .5rem;
  border: none;
  background: var(--dark);
  color: var(--light);
  text-align: center;
  width: 100%;
}
</style>