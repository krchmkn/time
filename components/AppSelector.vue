<template>
  <template v-if="type === 'input'">
    <input
      :list="id"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="title"
      :class="$style.input"
      v-bind="$attrs"
      @change="onChange"
    />

    <datalist :id="id">
      <option v-for="option in options" :value="option" :key="unique()" />
    </datalist>
  </template>

  <select
    v-else
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
  id: string
  title: string
  options: string[] | null
  modelValue: string
  disabled? : boolean
  type?: string,
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

function onChange({ target }: Event) {
  emit('update:modelValue', (target as HTMLInputElement).value)
}
</script>

<style module>
.title {
  padding-bottom: var(--measure);
}
.input,
.select {
  appearance: none;
  padding: var(--measure-half) var(--measure);
  border-radius: var(--measure-half);
  border: none;
  background: var(--dark);
  color: var(--white);
  width: 100%;
  cursor: pointer;
}
</style>