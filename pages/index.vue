<template>
  <div>
    <AppSection>
      <AppBlock>
        <AppTimeZoneSelector
          v-model="majorTimeZone"
          :list="timeZonesList"
          :pending="pendingMajorTimeZone"
          :disabled="pendingOnHourChange"
        />
        <AppClock
          :pending="pendingMajorTimeZone"
          :date-string="majorCurrentLocalTime"
        />
      </AppBlock>

      <AppBlock>
        <AppTimeZoneSelector
          v-model="minorTimeZone"
          :list="timeZonesList"
          :pending="pendingMinorTimeZone"
          :disabled="pendingOnHourChange"
        />
        <AppClock
          :pending="pendingMinorTimeZone"
          :date-string="minorCurrentLocalTime"
        />
      </AppBlock>
    </AppSection>

    <AppSection>
      <AppBlock>
        <AppHourSelector
          :value="selectedHour['major']"
          :title="majorTimeZone"
          :pending="pendingOnHourChange"
          :disabled="isHourSelectorDisabled"
          @change="(value) => onHourChange(value, 'major')"
        />
      </AppBlock>

      <AppBlock>
        <AppHourSelector
          :value="selectedHour['minor']"
          :title="minorTimeZone"
          :pending="pendingOnHourChange"
          :disabled="isHourSelectorDisabled"
          @change="(value) => onHourChange(value, 'minor')"
        />
      </AppBlock>
    </AppSection>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const {
  data: timeZonesList,
  error
} = await useFetch<string[]>('/api/time-zones')
if (error.value) {
  showError(error.value)
}

const route = useRoute()

const majorTimeZone = ref(
  (route.query['zone[]']?.[0] || config.defaultTimeZones[0])
)
const {
  pending: pendingMajorTimeZone,
  data: majorTimeZoneInfo
} = await useTimeZoneInfo(majorTimeZone, [majorTimeZone])

const majorCurrentLocalTime = ref('')
if (majorTimeZoneInfo.value) {
  majorCurrentLocalTime.value = majorTimeZoneInfo.value?.currentLocalTime
}

const minorTimeZone = ref(
  (route.query['zone[]']?.[1] || config.defaultTimeZones[1])
)
const {
  pending: pendingMinorTimeZone,
  data: minorTimeZoneInfo
} = await useTimeZoneInfo(minorTimeZone, [minorTimeZone])

const minorCurrentLocalTime = ref('')
if (minorTimeZoneInfo.value) {
  minorCurrentLocalTime.value = minorTimeZoneInfo.value?.currentLocalTime
}

const router = useRouter()
watch([majorTimeZone, minorTimeZone], ([majorVal, minorVal]) => {
  router.push({ query: { 'zone[]': [majorVal, minorVal]} })
})

const selectedHour = reactive<ObjectItem>({ major: '', minor: ''})
const pendingOnHourChange = ref(false)

async function onHourChange(value: string, fromKey: string) {
  pendingOnHourChange.value = true
  selectedHour[fromKey] = value

  const isMajor = (fromKey === 'major')
  try {
    selectedHour[
      (isMajor ? 'minor' : 'major')
    ] = await handleHourChange(
      value,
      (isMajor ? majorTimeZone.value : minorTimeZone.value),
      (isMajor ? minorTimeZone.value : majorTimeZone.value),
    )
  } finally {
    pendingOnHourChange.value  = false
  }
}

let interval: NodeJS.Timer
onMounted(timeTick)
onBeforeUnmount(() => clearInterval(interval))

function timeTick() {
  interval = setInterval(() => {
    if (majorCurrentLocalTime) {
      majorCurrentLocalTime.value = moment(majorCurrentLocalTime.value)
        .add(1, 'second').toISOString()
    }

    if (minorCurrentLocalTime) {
      minorCurrentLocalTime.value = moment(minorCurrentLocalTime.value)
        .add(1, 'second').toISOString()
    }
  }, 1000)
}

const isHourSelectorDisabled = computed(() => (
  pendingMajorTimeZone.value
    || pendingMinorTimeZone.value
    || pendingOnHourChange.value
))

watch([majorTimeZone, minorTimeZone], () => {
  selectedHour.major = ''
  selectedHour.minor = ''
})
</script>
