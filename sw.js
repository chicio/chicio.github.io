---
---
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
importScripts('/sw-cache-polyfill.js')

const siteCacheName = 'chicioCodingCache{% include version.txt %}'
const offlinePageUrl = '/offline.html'
const dependenciesUrls = [
  "/favicon.ico",
  offlinePageUrl,
  '/assets/images/no-wifi.png',
  {% include css-error-url.js %},
  {% include css-home-url.js %},
  {% include css-blog-archive-url.js %},
  {% include css-blog-home-url.js %},
  {% include css-blog-post-url.js %},
  {% include css-blog-tags-url.js %},
  {% include css-privacy-policy-url.js %},
  {% include css-cookie-policy-url.js %},
  {% include index-js-home-url.js %},
  {% include index-js-blog-url.js %}
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(siteCacheName).then((cache) => {
      return cache.addAll(dependenciesUrls)
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName !== siteCacheName
        }).map((cacheName) => {
          return caches.delete(cacheName)
        })
      )
    })
  )
})

workbox.setConfig({ debug: false })
workbox.googleAnalytics.initialize();

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
    .open(siteCacheName)
    .then((cache) => (
      cache
      .match(event.request)
      .then((cacheResponse) => {
        return cacheResponse || fetch(event.request)
          .then((fetchResponse) => {
            cache.put(event.request, fetchResponse.clone())
            return fetchResponse
          })
      })
      .catch(() => {
        if (event.request.mode === 'navigate' ||  
            (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))
        ) {
          return caches.match(offlinePageUrl)
        }
      })
    ))
  )  
})

self.addEventListener('message', (event) => {
  console.log(event)
  const isARefresh = (event) => event.data.message === 'refresh'

  const createDeleteOperationFor = (url, siteCache, requests) => siteCache
    .delete(requests
    .find((request) => request.url === url))

  const createDeleteOperationsForImages = (siteCache, requests) => requests
    .filter((request) => request.url.endsWith('.jpg') && request.url.includes('posts'))
    .map((request) => siteCache.delete(request))

  const sendRefreshCompletedMessageToClient = (event) => event.ports[0].postMessage({refreshCompleted: true})

  if (isARefresh(event)) {
    caches.open(siteCacheName).then((siteCache) => {
      siteCache.keys().then((requests) => {
        const deleteRequestToBeRefreshed = createDeleteOperationFor(event.data.url, siteCache, requests)
        const deleteRequestsForImagesToBeRefreshed = createDeleteOperationsForImages(siteCache, requests)
        Promise.all([
          deleteRequestToBeRefreshed, 
          ...deleteRequestsForImagesToBeRefreshed, 
        ])
        .then(() => sendRefreshCompletedMessageToClient(event))
        .catch(() => sendRefreshCompletedMessageToClient(event))
      })
    }) 
  }
})