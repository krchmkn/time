/**
 * https://www.timeapi.io/swagger/index.html
 */
export default defineEventHandler(async (event) => $fetch(
  'https://www.timeapi.io/api/Conversion/ConvertTimeZone',
  { method: 'post',  body: await readBody(event) }
))
