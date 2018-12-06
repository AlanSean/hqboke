importScripts('./cache-polyfill.js');
var CACHE_NAME = 'www.hqboke.com-v1';
var urlsToCache = [
    '/',
    './index.html',
    './css/index.css',
    './js/jq.js',
    './js/powder.js',
    './js/index.js',
    './favicon.jpg',
    './manifest.json',
];
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});
self.addEventListener('activate', function(event) {

});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
