import { skipWaiting, clientsClaim, cacheNames, RouteHandlerCallbackOptions } from "workbox-core"
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst } from 'workbox-strategies';
import * as googleAnalytics from 'workbox-google-analytics';

const stylesScriptsExpirationPlugin = new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 30 * 24 * 60 * 60 })
const fontsExpirationPlugin = new ExpirationPlugin({ maxEntries: 5, maxAgeSeconds: 180 * 24 * 60 * 60 })
const imagesExpirationPlugin = new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 24 * 60 * 60 })
const documentExpirationPlugin = new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 24 * 60 * 60 })

skipWaiting();
clientsClaim();
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox-webpack-plugin with the list of dependecies to be cached
precacheAndRoute(self.__WB_MANIFEST);
googleAnalytics.initialize();

self.addEventListener('install', (event: ExtendableEvent) => {
  const urls = [
    '/offline.html',
    '/assets/images/no-wifi.png'
  ];
  event.waitUntil(caches.open('chicio-coding-offline').then((cache) => cache.addAll(urls)));
});

registerRoute(
  ({request}) => request.destination === 'style' || request.destination === 'script',
  new CacheFirst({
    cacheName: 'chicio-coding-styles-scripts',
    plugins: [ stylesScriptsExpirationPlugin ],
  })
);

registerRoute(
  ({request}) => request.destination === 'document',
  new CacheFirst({
    cacheName: 'chicio-coding-documents',
    plugins: [ documentExpirationPlugin ],
  })
);

registerRoute(
  ({request}) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'chicio-coding-fonts',
    plugins: [ fontsExpirationPlugin ],
  })
);

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'chicio-coding-images',
    plugins: [ imagesExpirationPlugin ],
  })
);

//(options: RouteHandlerCallbackOptions): Promise<Response>
setCatchHandler((options: RouteHandlerCallbackOptions) => {
  if(!(typeof options.request === 'string') && options.request.destination == 'document') {
    return caches.match('/offline.html');
  }

  return Promise.resolve(Response.error());
})

self.addEventListener('message', (event: MessageEvent) => {
  const isARefresh = (event: MessageEvent): boolean => event.data.message === 'refresh'
  const sendRefreshCompletedMessageToClient = (event: MessageEvent): void => event.ports[0].postMessage({refreshCompleted: true})

  if (isARefresh(event)) {
    console.log(cacheNames)
    Promise.all([
      imagesExpirationPlugin.deleteCacheAndMetadata(),
      documentExpirationPlugin.deleteCacheAndMetadata()
    ]).then(() => console.log("clean completed"))
    // .then(() => sendRefreshCompletedMessageToClient(event))
    // .catch(() => sendRefreshCompletedMessageToClient(event))
  }
})

