<template>
  <AppTransition>
    <div v-if="pending">
      <p>
        <AppSkeletonLoader style="height: 1.4em;" />
      </p>
      <AppSkeletonLoader style="height: 2.3em;" />
    </div>
    <div v-else>
      <template v-if="disabled">
        <p class="t-left">Please select a time zone</p>
      </template>
      <template v-else>
        <p class="t-left">In {{ title.split('/').pop() }}</p>
      </template>

      <AppSelector
        title="Select hour"
        v-model="hour"
        :options="hours"
        :disabled="disabled"
      />
    </div>
  </AppTransition>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string,
  title: string
  pending: boolean
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const hours = [...Array(25).keys()].map(
  (num) => `${num} ${plural(num, 'hour', 'hours', 'hours')}`
)

const hour = computed({
  get() {
    return props.value
  },
  set(newVal) {
    emit('change', newVal)
  }
})
</script>
