---
---
importScripts('/cache-polyfill.js');

var siteCacheName = 'chicioCodingCache';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(siteCacheName).then(function(cache) {
      return cache.addAll(
        [
          '/assets/js/index.blog.min.js?rev=fd91efd7c43ed686d213775ad3119206',
          '/assets/js/index.home.min.js?rev=ac3166c4939fa4f64b868165bb2d7a6a',
          '/assets/styles/style.css?rev=e523b46c9c5128be62b0db042e7ac2db',
        ]
      );
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
