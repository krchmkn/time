<template>
  <section class="section">
    <AppBlock v-for="key in ['first', 'second']" :key="unique()">
      <AppCurrentTime
        :id="key"
        :pending="pending"
        :timeZones="timeZonesList"
      />
    </AppBlock>
  </section>

  <AppHourSelectors />
</template>

<script setup lang="ts">
const selectedTimeZone = useSelectedTimeZone()

const router = useRouter()
if (
  !Object.values(selectedTimeZone.value).every(el => !el)
) {
  router.replace({ query: { ...toRaw(selectedTimeZone.value) }})
}

const { pending, data: timeZonesList, error } = useTimeZonesList()
watch([error, timeZonesList], ([errorVal, timeZonesListVal]) => {
  if (errorVal || !timeZonesListVal) {
    showError({ statusMessage: 'Failed to load list of timezones.' })
  }
})

let interval: NodeJS.Timer
onMounted(timeTick)
onBeforeUnmount(() => clearInterval(interval))

const dateString = useDateString()
function timeTick() {
  clearInterval(interval)
  interval = setInterval(() => {
    for (const key in dateString.value) {
      const value = dateString.value[key]
      if (!value) {
        continue
      }
      dateString.value[key] = moment(value).add(1, 'second').toISOString()
    }
  }, 1000)
}
</script>
