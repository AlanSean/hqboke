importScripts('/cache-polyfill.js');
var CACHE_NAME = 'www.hqboke.com-v';
var urlsToCache = [
    '/',
    '/index.html',
    '/css/index.css',
    '/js/jq.js',
    '/js/powder.js',
    '/js/index.js',
    '/favicon.jpg',
    '/manifest.json',
];
caches.keys().then(function (cacheList) {
    var v = cacheList.length>0 ?  Number(cacheList[0].split(CACHE_NAME)[1]) : 1;
    return {
        name:CACHE_NAME + (v+1),
        oldname:CACHE_NAME+v
    };
}).then( res:{catch_name,old_catch_name} => {
    self.addEventListener('install', function(event) {
      // 执行安装步骤
        event.waitUntil(
            caches.open(catch_name).then(function(cache) {
                return cache.addAll(urlsToCache);
            })
        );
    });
    self.addEventListener('activate', function(event) {
        console.log('清理old_catch_name',old_catch_name);
        caches.delete(old_catch_name);
    });
    self.addEventListener('fetch', function(event) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    });
})
