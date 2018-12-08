importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('fabrizioduroni_v2.0.0').then(function(cache) {
     return cache.addAll([
       '/',
       '/?utm_source=pwa',
       '/assets/images/fabrizio-duroni.jpg',
       '/assets/images/xcode.png'
     ]);
   })
 );
});

// Network falling back to the cache
self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});