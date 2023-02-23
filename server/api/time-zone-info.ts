/**
 * https://www.timeapi.io/swagger/index.html
 */
export default defineEventHandler(
  (event) => $fetch(
    'https://www.timeapi.io/api/TimeZone/zone',
    { query: { timeZone: event.node.req.url.match(/timeZone=(.*)/)[1] } }
  )
)
