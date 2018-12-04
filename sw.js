importScripts('/cache-polyfill.js');
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/index.html',
    '/css/index.css',
    '/js/jq.js',
    '/js/powder.js',
    '/js/index.js',
    '/favicon.jpg',
    '/manifest.json',
];

self.addEventListener('install', function(event) {
  // 执行安装步骤
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');
});
