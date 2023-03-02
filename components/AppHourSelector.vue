<template>
  <AppTransition>
    <div v-if="pending">
      <p>
        <AppSkeletonLoader style="height: 1.4em;" />
      </p>
      <AppSkeletonLoader style="height: 2.3em;" />
    </div>
    <div v-else>
      <p class="t-left unselectable">
        <label :for="id">In {{ title.split('/').pop() }}</label>
      </p>
      <AppSelector
        :id="id"
        title="Select hour"
        name="hours"
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
  pending?: boolean
  disabled?: boolean
  id: string
}>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const hours = [...Array(24).keys()].map(
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
