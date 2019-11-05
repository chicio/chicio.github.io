/* @flow */

const getTrackingClientId = (): string => {
  var id: string = ''
  ga.getAll().forEach((tracker) => {
    id = tracker.get('clientId')
  })
  return id
}

export { getTrackingClientId }
