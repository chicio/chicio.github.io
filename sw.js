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
  console.log("SW Received Message: " + event.data);
  shouldRefresh = event.data.value;
  //TODO: refresh cache
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName === siteCacheName
        }).map((cacheName) => {
          return caches.delete(cacheName).then(() => {
            return event.ports[0].postMessage("SW Says 'clean cache complete'");
          })
        })
      );
    })
  );
});