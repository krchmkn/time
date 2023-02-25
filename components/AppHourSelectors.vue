<template>
  <NuxtErrorBoundary>
    <section class="section">
      <AppBlock v-for="(_, key) in selectedHour" :key="unique()">
        <AppHourSelector
          :value="selectedHour[key]"
          :title="selectedTimeZone[key]"
          :pending="pending[key]"
          @change="(value) => onHourChange(value, key)"
        />
      </AppBlock>
    </section>

    <template #error>
      <AppBlock>
        <p>An error occurred</p>
        <button @click="() => router.go(0)">
          Try again
        </button>
      </AppBlock>
    </template>
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
const selectedTimeZone = useSelectedTimeZone()
const selectedHour = reactive<ObjectItem>({ first: '', second: '' })
const pending = reactive<{ [key: string]: boolean }>({ first: false, second: false })
const router = useRouter()

async function onHourChange(value: string, fromKey: string | number) {
  selectedHour[fromKey] = value

  const toKey: string = fromKey === 'first' ? 'second' : 'first'
  const dateTime = moment()
                    .utcOffset(0)
                    .set({
                      hour: parseInt(value, 10),
                      minute: 0,
                      second: 0,
                      millisecond: 0
                    })
                    .format('yyyy-MM-DD HH:mm:ss')

  pending[toKey] = true
  const { data, error } = await useTimeZoneConversion({
    fromTimeZone: selectedTimeZone.value[fromKey],
    dateTime,
    toTimeZone: selectedTimeZone.value[toKey],
    dstAmbiguity: ''
  })
  pending[toKey] = false

  if (error.value) {
    throw createError(error.value)
  }

  if (data.value) {
    const hour = moment(data.value.conversionResult.dateTime).hour();
    selectedHour[toKey] = `${hour} ${plural(hour, 'hour', 'hours', 'hours')}`
  }
}
</script>
