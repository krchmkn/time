export const useDateString = () => useState<ObjectItem>(
  'dateString', () => ({ first: '', second: '' })
)

export const useSelectedTimeZone = () => {
  const route = useRoute()
  return useState<ObjectItem>(
    'selectedTimeZone',
    () => ({
      first: route.query.first?.toString() || 'America/Costa_Rica',
      second: route.query.second?.toString() || 'Europe/Moscow'
    })
  )
}
