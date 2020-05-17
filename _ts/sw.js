import { skipWaiting, clientsClaim, cacheNames } from "workbox-core"
import { precacheAndRoute } from 'workbox-precaching';
import * as googleAnalytics from 'workbox-google-analytics';

skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);
googleAnalytics.initialize();

self.addEventListener('message', (event) => {
  const isARefresh = (event) => event.data.message === 'refresh'

  const sendRefreshCompletedMessageToClient = (event) => event.ports[0].postMessage({refreshCompleted: true})

  if (isARefresh(event)) {
    console.log(cacheNames)
    // sendRefreshCompletedMessageToClient(event)
  }
})

