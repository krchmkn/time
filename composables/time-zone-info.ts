export async function useTimeZoneInfo(
  timeZone: string, watch: any[]
) {
  return useFetch<ObjectItem>(
    '/api/time-zone-info',
    {
      query: { timeZone },
      pick: ['currentLocalTime'],
      watch
    }
  )
}