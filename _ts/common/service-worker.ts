interface ServiceWorkerMessage {
  message: string;
  url: string;
}

const registerToServicerWorker = (): void => {
  if ('serviceWorker' in navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => { console.log('Service Worker registration completed') })
      .catch((err) => { console.error('Service Worker registration failed:', err) })
  } else {
    console.log('Service worker not supported')
  }
}

const sendMessageToServiceWorker = (message: ServiceWorkerMessage): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const messageChannel: MessageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event: MessageEvent): void => {
      if (event.data) {
        if (event.data.error) {
          reject(event.data.error)
        } else {
          resolve(event.data)
        }
      }
    }
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2])
    }
  })
}

export { sendMessageToServiceWorker, registerToServicerWorker }
