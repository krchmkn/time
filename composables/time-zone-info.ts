export const useTimeZoneInfo = (timeZone: string) => useLazyFetch<ObjectItem>(
  '/api/time-zone-info',
  { query: { timeZone }, pick: ['currentLocalTime'] }
)