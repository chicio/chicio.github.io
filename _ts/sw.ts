import { skipWaiting, clientsClaim, cacheNames, RouteHandlerCallbackOptions } from "workbox-core"
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst } from 'workbox-strategies';
import * as googleAnalytics from 'workbox-google-analytics';

const CACHE_PREFIX = 'workbox-chicio-coding'
const CACHE_OFFLINE_NAME = `${CACHE_PREFIX}-offline`
const CACHE_STYLES_SCRIPT_NAME = `${CACHE_PREFIX}-styles-scripts`
const CACHE_DOCUMENTS_NAME = `${CACHE_PREFIX}-documents`
const CACHE_FONTS_NAME = `${CACHE_PREFIX}-fonts`
const CACHE_IMAGES_NAME = `${CACHE_PREFIX}-images`

const OFFLINE_PAGE_URL = '/offline.html'
const OFFLINE_PAGE_NO_NETWORK_IMAGE_URL = '/assets/images/no-wifi.png'

const stylesScriptsExpirationPlugin = new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 15 * 24 * 60 * 60 })
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
    OFFLINE_PAGE_URL,
    OFFLINE_PAGE_NO_NETWORK_IMAGE_URL
  ];
  event.waitUntil(caches.open(CACHE_OFFLINE_NAME).then((cache) => cache.addAll(urls)));
});

registerRoute(
  ({request}) => request.destination === 'style' || request.destination === 'script',
  new CacheFirst({
    cacheName: CACHE_STYLES_SCRIPT_NAME,
    plugins: [ stylesScriptsExpirationPlugin ],
  })
);

registerRoute(
  ({request}) => request.destination === 'document',
  new CacheFirst({
    cacheName: CACHE_DOCUMENTS_NAME,
    plugins: [ documentExpirationPlugin ],
  })
);

registerRoute(
  ({request}) => request.destination === 'font',
  new CacheFirst({
    cacheName: CACHE_FONTS_NAME,
    plugins: [ fontsExpirationPlugin ],
  })
);

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: CACHE_IMAGES_NAME,
    plugins: [ imagesExpirationPlugin ],
  })
);

setCatchHandler((options: RouteHandlerCallbackOptions): Promise<Response> => {
  if(!(typeof options.request === 'string') && options.request.destination == 'document') {
    return caches.match(OFFLINE_PAGE_URL);
  }

  if(!(typeof options.request === 'string') && 
  options.request.destination == 'image' && 
  options.url.pathname == OFFLINE_PAGE_NO_NETWORK_IMAGE_URL) {
    return caches.match(OFFLINE_PAGE_NO_NETWORK_IMAGE_URL);
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
    ])
    .then(() => sendRefreshCompletedMessageToClient(event))
    .catch(() => sendRefreshCompletedMessageToClient(event))
  }
})

