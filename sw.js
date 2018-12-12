---
---
importScripts('/cache-polyfill.js');

const siteCacheName = 'chicioCodingCache';
const dependenciesUrls = [
  {% include service-worker-home-urls.js %}
  {% include service-worker-blog-urls.js %}
  {% include service-worker-css-urls.js %}
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(siteCacheName).then((cache) => {
      return cache.addAll(dependenciesUrls);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName === siteCacheName
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
