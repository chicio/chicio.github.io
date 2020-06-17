import { skipWaiting, clientsClaim, cacheNames, RouteHandlerCallbackOptions } from "workbox-core"
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler, Route } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst } from 'workbox-strategies';
import * as googleAnalytics from 'workbox-google-analytics';

// Fix self: https://stackoverflow.com/questions/56356655/structuring-a-typescript-project-with-workers
declare const self: ServiceWorkerGlobalScope;
export {};

const CACHE_PREFIX = 'workbox-chicio-coding'
const CACHE_OFFLINE_NAME = `${CACHE_PREFIX}-offline`
const CACHE_SCRIPT_NAME = `${CACHE_PREFIX}-scripts`
const CACHE_STYLES_NAME = `${CACHE_PREFIX}-styles`
const CACHE_DOCUMENTS_NAME = `${CACHE_PREFIX}-documents`
const CACHE_FONTS_NAME = `${CACHE_PREFIX}-fonts`
const CACHE_IMAGES_NAME = `${CACHE_PREFIX}-images`

const OFFLINE_PAGE_URL = '/offline.html'
const OFFLINE_PAGE_NO_NETWORK_IMAGE_URL = '/assets/images/no-wifi.png'

const stylesScriptsExpirationPlugin = new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 15 * 24 * 60 * 60, purgeOnQuotaError: true })
const fontsExpirationPlugin = new ExpirationPlugin({ maxEntries: 5, maxAgeSeconds: 180 * 24 * 60 * 60 })
const imagesExpirationPlugin = new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 24 * 60 * 60 })
const documentExpirationPlugin = new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 24 * 60 * 60, purgeOnQuotaError: true })

skipWaiting()
clientsClaim()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox-webpack-plugin with the list of dependecies to be cached
precacheAndRoute(self.__WB_MANIFEST)
googleAnalytics.initialize()

self.addEventListener('install', (event: ExtendableEvent) => {
  const offlineUrls = [
    OFFLINE_PAGE_URL,
    OFFLINE_PAGE_NO_NETWORK_IMAGE_URL
  ];
  event.waitUntil(
    Promise.all([
      caches.delete(CACHE_DOCUMENTS_NAME),
      caches.delete(CACHE_SCRIPT_NAME),
      caches.delete(CACHE_STYLES_NAME),
      caches.delete(CACHE_FONTS_NAME),
      caches.delete(CACHE_IMAGES_NAME),
      caches.open(CACHE_OFFLINE_NAME).then((cache) => cache.addAll(offlineUrls))
    ])
  );
})

const registerCacheFirstRouteUsing = (
  destination: RequestDestination,
  cacheName: string,
  expirationPlugin: ExpirationPlugin
): Route => registerRoute(
  ({ request }) => request.destination === destination,
  new CacheFirst({
    cacheName: cacheName,
    plugins: [expirationPlugin],
  })
)

registerCacheFirstRouteUsing('style', CACHE_STYLES_NAME, stylesScriptsExpirationPlugin)
registerCacheFirstRouteUsing('script', CACHE_SCRIPT_NAME, stylesScriptsExpirationPlugin)
registerCacheFirstRouteUsing('document', CACHE_DOCUMENTS_NAME, documentExpirationPlugin)
registerCacheFirstRouteUsing('font', CACHE_FONTS_NAME, fontsExpirationPlugin)
registerCacheFirstRouteUsing('image', CACHE_IMAGES_NAME, imagesExpirationPlugin)

setCatchHandler((options: RouteHandlerCallbackOptions): Promise<Response> => {
  const isADocumentRequest = (options: RouteHandlerCallbackOptions): boolean =>
    !(typeof options.request === 'string') && options.request.destination == 'document';
  const isAOfflinePageImageRequest = (options: RouteHandlerCallbackOptions): boolean =>
    !(typeof options.request === 'string') &&
    options.request.destination == 'image' &&
    options.url?.pathname == OFFLINE_PAGE_NO_NETWORK_IMAGE_URL

  if (isADocumentRequest(options)) {
    return caches.match(OFFLINE_PAGE_URL) as Promise<Response>;
  }

  if (isAOfflinePageImageRequest(options)) {
    return caches.match(OFFLINE_PAGE_NO_NETWORK_IMAGE_URL) as Promise<Response>;
  }

  return Promise.resolve(Response.error());
})

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const isARefresh = (event: ExtendableMessageEvent): boolean => event.data.message === 'refresh'
  const sendRefreshCompletedMessageToClient = (event: ExtendableMessageEvent): void => event.ports[0].postMessage({ refreshCompleted: true })

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
