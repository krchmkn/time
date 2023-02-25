<template>
  <select
    :class="$style.select"
    v-model="value"
    :disabled="disabled"
  >
    <option selected disabled value="">
      {{ title }}
    </option>
    <option v-for="option in options" :value="option" :key="unique()">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  options: string[] | null
  modelValue: string
  disabled? : boolean
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
  padding-bottom: var(--measure);
}

.select {
  appearance: none;
  padding: var(--measure-half) var(--measure);
  border-radius: var(--measure-half);
  border: none;
  background: var(--dark);
  color: var(--white);
  text-align: center;
  width: 100%;
  cursor: pointer;
}
</style>