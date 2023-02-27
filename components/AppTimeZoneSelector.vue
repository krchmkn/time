<template>
  <AppTransition>
    <div v-if="pending">
      <p><AppSkeletonLoader style="height: 1.4em;" /></p>
      <p><AppSkeletonLoader style="height: 2.3em;" /></p>
    </div>
    <div v-else>
      <p class="t-left unselectable">Current time in</p>
      <p>
        <AppSelector
          title="Select time zone"
          v-model="value"
          :options="list"
          :disabled="disabled"
        />
      </p>
    </div>
  </AppTransition>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  pending?: boolean
  disabled?: boolean
  list: string[] | null
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