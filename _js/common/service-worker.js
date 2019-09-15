/* @flow */
const sendMessageToServiceWorker = (message: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const messageChannel: MessageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event: MessageEvent) => {
      if (event.data) {
        if (event.data.error) {
          reject(event.data.error)
        } else {
          resolve(event.data)
        }
      }
    }
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message, ([messageChannel.port2]: any))
    }
  })
}

export { sendMessageToServiceWorker }
