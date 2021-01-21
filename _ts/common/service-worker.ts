import { Workbox } from "workbox-window";

interface ServiceWorkerMessage {
  message: string;
}

let wb: Workbox;

const isServiceWorkerSupported: () => boolean = () => ('serviceWorker' in navigator)

if (isServiceWorkerSupported()) {
  wb = new Workbox('/sw.js');
}

const registerToServicerWorker = (): void => {
  if (isServiceWorkerSupported()) {
    wb.register()
      .then(() => { console.log('Service Worker registration completed') })  
      .catch((err) => { console.error('Service Worker registration failed:', err) })
  }
}

const sendMessageToServiceWorker = (message: ServiceWorkerMessage): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    wb.messageSW(message).then((event: MessageEvent): void => {
      if (event.data) {
        if (event.data.error) {
          reject(event.data.error)
        } else {
          resolve(event.data)
        }
      }
    })
  })
}

export { sendMessageToServiceWorker, registerToServicerWorker, isServiceWorkerSupported }
