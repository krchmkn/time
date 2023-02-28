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
const route = useRoute()

// Requests a list of time zones
const {
  data: timeZonesList,
  error
} = await useFetch<string[]>('/api/time-zones')
if (error.value) {
  showError(error.value)
}

// Requests information about the major time zone
const majorTimeZone = ref(
  (route.query['zone[]']?.[0] || config.defaultTimeZones[0])
)
const {
  pending: pendingMajorTimeZone,
  data: majorTimeZoneInfo,
  error: majorError,
} = await useTimeZoneInfo(majorTimeZone, [majorTimeZone])

// Sets major current local time
const majorCurrentLocalTime = ref('')
if (majorTimeZoneInfo.value) {
  majorCurrentLocalTime.value = majorTimeZoneInfo.value?.currentLocalTime
}

// Watches major current local time change
watch(majorTimeZoneInfo, (newVal) => {
  if (!newVal) {
    return
  }
  majorCurrentLocalTime.value = newVal.currentLocalTime
})

// Requests information about the minor time zone
const minorTimeZone = ref(
  (route.query['zone[]']?.[1] || config.defaultTimeZones[1])
)
const {
  pending: pendingMinorTimeZone,
  data: minorTimeZoneInfo,
  error: minorError,
} = await useTimeZoneInfo(minorTimeZone, [minorTimeZone])

// Sets minor current local time
const minorCurrentLocalTime = ref('')
if (minorTimeZoneInfo.value) {
  minorCurrentLocalTime.value = minorTimeZoneInfo.value?.currentLocalTime
}

// Watches minor current local time change
watch(minorTimeZoneInfo, (newVal) => {
  if (!newVal) {
    return
  }
  minorCurrentLocalTime.value = newVal.currentLocalTime
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

// Starts interval for current major and minor times changes
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


const router = useRouter()
// Keeps track of time zone changes
watch([
  majorTimeZone, minorTimeZone,
  majorError, minorError
], ([
  majorVal, minorVal,
  majorErrorVal, minorErrorVal
]) => {
  router.push({ query: { 'zone[]': [majorVal, minorVal]} })
  // Clear the selected hour every time when changing time zones
  selectedHour.major = ''
  selectedHour.minor = ''

  // If the timezone request returns an error,
  // sets the clock to its initial value

  if (majorErrorVal) {
    majorCurrentLocalTime.value = ''
    return
  }

  if (minorErrorVal) {
    minorCurrentLocalTime.value = ''
    return
  }
})
</script>
