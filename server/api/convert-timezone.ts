export default defineEventHandler((event) => {
  return $fetch(
    'https://www.timeapi.io/api/Conversion/ConvertTimeZone',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event.node.req.body),
    }
  )
})
