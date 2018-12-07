const CACHE_NAME = 'v1.0.1';
var urlsToCache = [
    '/',
    './index.html',
    './css/index.css',
    './js/jq.js',
    './js/powder.js',
    './js/index.js',
    './manifest.json',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        }).then(function(){
            self.skipWaiting();
        })
    );
});
this.addEventListener('activate', function(event) {
    var CACHE_NAMES = [CACHE_NAME];
     event.waitUntil(
        self.clients.claim(),
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (CACHE_NAMES.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    )
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => cache.match(event.request, {ignoreSearch: true})).then(response => {
          return response || fetch(event.request);
        })
      );
});
