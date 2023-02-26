export async function handleHourChange(
  newVal: string,
  fromTimeZone: string,
  toTimeZone: string,
) {
  const dateTime = moment()
    .utcOffset(0)
    .set({
      hour: parseInt(newVal, 10),
      minute: 0,
      second: 0,
      millisecond: 0
    })
    .format('yyyy-MM-DD HH:mm:ss')

  const { data, error } = await useLazyFetch<{[key: string]: ObjectItem}>(
    '/api/convert-time-zone',
    {
      method: 'post',
      pick: ['conversionResult'],
      body: {
        fromTimeZone,
        dateTime,
        toTimeZone,
        dstAmbiguity: ''
      }
    }
  )

  if (error.value) {
    throw createError(error.value)
  }

  if (!data.value) {
    return ''
  }

  const hour = moment(data.value.conversionResult.dateTime).hour();
  return `${hour} ${plural(hour, 'hour', 'hours', 'hours')}`;
}