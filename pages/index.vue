<template>
  <section :class="$style.section">
    <AppBlock v-for="(_, key) in state.timeZone">
      <AppCurrentTime
        v-model="state.timeZone[key]"
        :dateString="state.dateString[key]"
        :timeZones="timeZones"
      />
    </AppBlock>
  </section>

  <section :class="$style.section">
    <AppBlock v-for="(_, key) in state.hour">
      <AppHourSelector
        :value="state.hour[key]"
        :title="state.timeZone[key]"
        :pending="state.pendingTimeZoneInfo[key] || state.pendingConvertHour[key]"
        @change="(value) => onHourChange(value, key)"
      />
    </AppBlock>
  </section>
</template>

<script setup lang="ts">
import moment from 'moment';
import plural from 'text-plural'

function throwFatalError(): never {
  throw createError({
    statusCode: 500,
    statusMessage: 'An error has occurred',
    fatal: true
  })
}

const { data: timeZones } = await useFetch<string[] | null>('/api/time-zones')
const route = useRoute()

const state = reactive<{
  timeZone: { [key: string]: string }
  dateString: { [key: string]: string }
  hour: { [key: string]: string }
  pendingTimeZoneInfo: { [key: string]: boolean }
  pendingConvertHour: { [key: string]: boolean }
}>({
  timeZone: {
    first: route.query.first?.toString() || 'America/Costa_Rica',
    second: route.query.second?.toString() || 'Europe/Moscow'
  },
  dateString: { first: '', second: '' },
  hour: { first: '', second: '' },
  pendingTimeZoneInfo: { first: false, second: false },
  pendingConvertHour: { first: false, second: false }
})

const router = useRouter()
router.replace({ query: { ...state.timeZone }})
watch(state.timeZone, (newVal) => {
  router.replace({ query: { ...newVal }})
})

function setData(key: string) {
  state.pendingTimeZoneInfo[key] = true
  state.dateString[key] = ''

  useLazyFetch<{
    currentLocalTime: string
  }>(
    '/api/time-zone-info',
    { query: { timeZone: state.timeZone[key] } }
  ).then(({ pending, data, error }) => {
    state.pendingTimeZoneInfo[key] = pending.value

    if (error.value) {
      throwFatalError()
    }

    if (data.value) {
      state.dateString[key] = data.value.currentLocalTime

      const hour = moment(data.value.currentLocalTime).hour();
      state.hour[key] = `${hour} ${plural(hour, 'hour', 'hours', 'hours')}`
    }
  }).catch(() => {
    throwFatalError()
  })
}

watchEffect(() => setData('first'))
watchEffect(() => setData('second'))

function convertHour(fromKey: string, hour: string, toKey: string) {
  state.pendingConvertHour[toKey] = true

  useLazyFetch<{
    conversionResult: { dateTime: string }
  }>('/api/convert-timezone', {
    method: 'POST',
    body: {
      fromTimeZone: state.timeZone[fromKey],
      dateTime: moment()
                  .utcOffset(0)
                  .set({ hour: parseInt(hour, 10), minute: 0, second: 0, millisecond: 0 })
                  .format('yyyy-MM-DD HH:mm:ss'),
      toTimeZone: state.timeZone[toKey],
      dstAmbiguity: ''
    }
  }).then(({ pending, data, error }) => {
    state.pendingConvertHour[toKey] = pending.value

    if (error.value) {
      alert(error.value)
    }

    if (data.value) {
      const hour = moment(data.value.conversionResult.dateTime).hour();
      state.hour[toKey] = `${hour} ${plural(hour, 'hour', 'hours', 'hours')}`
    }
  })
}

function onHourChange(value: string, key: string | number) {
  switch(key) {
    case 'first':
      convertHour('first', value, 'second')
      break;
    case 'second':
      convertHour('second', value, 'first')
      break;
  }
}

let interval: number
onMounted(() => {
  interval = setInterval(() => {
    state.dateString.first = moment(state.dateString.first).add(1, 'second').toISOString()
    state.dateString.second = moment(state.dateString.second).add(1, 'second').toISOString()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style module>
.section {
  display: grid;
  gap: .5rem;
  margin-bottom: 2rem;
}

@media (min-width: 481px) {
  .section { grid-template-columns: 1fr 1fr; }
}
</style>