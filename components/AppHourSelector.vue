<template>
  <AppTransition>
    <AppSkeletonLoader
      v-if="pending"
      :heights="['1.4em', '2.3em']"
    />
    <div v-else>
      <p>In {{ title.split('/').pop() }}</p>
      <AppSelector
        title="Select hour"
        v-model="hour"
        :options="hours"
      />
    </div>
  </AppTransition>
</template>

<script setup lang="ts">
import plural from 'text-plural'

const props = defineProps<{
  value: string,
  title: string
  pending: boolean
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
