export const useTimeZoneConversion = (body: ObjectItem) => useLazyFetch<{
  [key: string]: ObjectItem
}>(
  '/api/convert-time-zone',
  { method: 'post', body, pick: ['conversionResult'] }
)

