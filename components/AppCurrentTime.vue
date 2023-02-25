<template>
  <AppTransition>
    <div v-if="pending">
      <p><AppSkeletonLoader style="height: 1.4em;" /></p>
      <p><AppSkeletonLoader style="height: 2.3em;" /></p>
    </div>
    <div v-else>
      <p class="t-left">Current time in</p>
      <p>
        <AppSelector
          title="Select time zone"
          v-model="selectedTimeZone[id]"
          :options="timeZones"
          :disabled="pendingTimeZoneInfo"
        />
      </p>
    </div>
  </AppTransition>

  <AppSkeletonLoader v-if="pendingTimeZoneInfo" style="height: 2.4em;" />
  <AppClock v-else :date-string="dateString[id]" />
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  timeZones: string[] | null
  pending: boolean
}>()

const selectedTimeZone = useSelectedTimeZone()
const dateString = useDateString()

const { pending: pendingTimeZoneInfo, data, error, refresh } = useTimeZoneInfo(
  selectedTimeZone.value[props.id]
)

watch([error, data], ([errorVal, dataVal]) => {
  if (errorVal) {
    showError({ statusMessage: 'Failed to load timezone information.' })
  }

  if (dataVal) {
    // It sets AppClock time
    dateString.value[props.id] = dataVal.currentLocalTime
  }
})

const router = useRouter()
watch(() => selectedTimeZone.value[props.id], () => {
  router.replace({ query: { ...toRaw(selectedTimeZone.value) }})
  refresh()
})
</script>
