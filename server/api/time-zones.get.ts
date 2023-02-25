/**
 * https://www.timeapi.io/swagger/index.html
 */
export default defineEventHandler(() => $fetch(
  'https://www.timeapi.io/api/TimeZone/AvailableTimeZones'
))
