var CACHE_NAME = 'v2';
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
    console.log('instal')
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        }).then(function(){
            self.skipWaiting();
        })
    );
});
this.addEventListener('activate', function(event) {
  // 声明缓存白名单，该名单内的缓存目录不会被生成
    var cacheWhitelist = [CACHE_NAME];
    console.log('发生更新');
    event.waitUntil(
        Promise.all([
            clients.claim(),
            caches.keys().then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if (cacheWhitelist.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                }));
            })
        ])
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
