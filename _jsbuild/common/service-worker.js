/*  */
const sendMessageToServiceWorker = (message) => {
  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event) => {
      if (event.data) {
        if (event.data.error) {
          reject(event.data.error)
        } else {
          resolve(event.data)
        }
      }
    }
    if (navigator.serviceWorker) {
      navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2])
    }
  })
}

export { sendMessageToServiceWorker }
