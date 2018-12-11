---
---
importScripts('/cache-polyfill.js');

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('fabrizioduroni.it_2.0.0').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
