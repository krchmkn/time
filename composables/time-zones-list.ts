export const useTimeZonesList = () => useFetch<string[]>(
  '/api/time-zones',
  { default: () => [] }
)
