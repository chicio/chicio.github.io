/*  */
/* global ga */

const getTrackingClientId = () => {
  var id = ''
  ga.getAll().forEach((tracker) => {
    id = tracker.get('clientId')
  })
  return id
}

export { getTrackingClientId }
