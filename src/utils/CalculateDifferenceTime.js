import moment from 'moment'

export function differenceTime(startTime, endTime) {
  let result = 0
  const startTimeString = moment().format('YYYY-MM-DD') + ' ' + startTime.slice(0, 2) + ':' + startTime.slice(3)
  const endTimeString = moment().format('YYYY-MM-DD') + ' ' + endTime.slice(0, 2) + ':' + endTime.slice(3)
  const startTimeStamp = moment(startTimeString).valueOf()
  const endTimeStamp = moment(endTimeString).valueOf()
  result = endTimeStamp - startTimeStamp
  return result
}

export function differenceDate(startDate, endDate) {
  let result = 0
  const startTimeString = moment(startDate).format('YYYY-MM-DD') + ' 00:00'
  const endTimeString = moment(endDate).format('YYYY-MM-DD') + ' 00:00'
  const startTimeStamp = moment(startTimeString).valueOf()
  const endTimeStamp = moment(endTimeString).valueOf()
  result = endTimeStamp - startTimeStamp
  return result
}

export function checkCurrentTime(time) {
  let result = false
  const currentTimeString = moment().format('YYYY-MM-DD') + ' ' + time.slice(0, 2) + ':' + time.slice(3)
  const currentTime = moment(currentTimeString).valueOf()
  if(moment().valueOf() - currentTime < 60000) {
    result = true
  }
  return result
}