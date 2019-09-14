---
---
importScripts('/cache-polyfill.js');

const siteCacheName = 'chicioCodingCache{% include version.txt %}';
const dependenciesUrls = [
  "/favicon.ico",
  {% include service-worker-css-home-urls.js %}
  {% include service-worker-css-blog-archive-urls.js %}
  {% include service-worker-css-blog-home-urls.js %}
  {% include service-worker-css-blog-post-urls.js %}
  {% include service-worker-css-blog-tags-urls.js %}
  {% include service-worker-css-privacy-policy-urls.js %}
  {% include service-worker-css-cookie-policy-urls.js %}
  {% include service-worker-js-home-urls.js %}
  {% include service-worker-js-blog-urls.js %}
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(siteCacheName).then((cache) => {
      return cache.addAll(dependenciesUrls);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName !== siteCacheName
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
    console.log(event.request)
    event.respondWith(
      caches.open(siteCacheName).then(async (cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );  
});

self.addEventListener('message', (event) => {
  const isARefresh = (event) => event.data.message === 'refresh';

  const createDeleteOperationFor = (url, siteCache, requests) => siteCache
    .delete(requests
    .find((request) => request.url === url));

  const createDeleteOperationsForImages = (siteCache, requests) => requests
    .filter((request) => request.url.endsWith('.jpg') && request.url.includes('posts'))
    .map((request) => siteCache.delete(request))

  const sendShouldRefreshMessageToClient = (event) => event.ports[0].postMessage({shouldRefresh: true});

  if (isARefresh(event)) {
    const refreshMessage = {shouldRefresh: true};
    caches.open(siteCacheName).then((siteCache) => {
      siteCache.keys().then((requests) => {
        const deleteRequestToBeRefreshed = createDeleteOperationFor(event.data.url, siteCache, requests)
        const deleteRequestsForImagesToBeRefreshed = createDeleteOperationsForImages(siteCache, requests)
        Promise.all([deleteRequestToBeRefreshed, ...deleteRequestsForImagesToBeRefreshed])
          .then(() => sendShouldRefreshMessageToClient(event))
          .catch(() => sendShouldRefreshMessageToClient(event));
      });
    });  
  }
});

