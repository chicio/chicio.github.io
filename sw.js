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


self.addEventListener('fetch', function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});