export const useTimeZonesList = () => useLazyFetch<string[]>(
  '/api/time-zones',
  { default: () => [] }
)
