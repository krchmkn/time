<template>
  <AppTransition>
    <AppSkeletonLoader
      v-if="!timeZones || !timeZones.length"
      :heights="['1.4em', '2.4em']"
    />
    <div v-else>
      <p>Current time in</p>
      <p>
        <AppSelector
          title="Select time zone"
          v-model="timeZone"
          :options="timeZones"
        />
      </p>
    </div>
  </AppTransition>

  <AppTransition>
    <AppSkeletonLoader v-if="!dateString" :heights="['2.5em']" />
    <AppClock v-else :date-string="dateString" />
  </AppTransition>
</template>

<script setup lang="ts">
const props = defineProps<{
  dateString: string
  modelValue: string
  timeZones: string[] | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const timeZone = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
