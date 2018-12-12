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
    caches.open(siteCacheName).then(function(cache) {
      return cache.addAll(dependenciesUrls);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName === siteCacheName
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(siteCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
