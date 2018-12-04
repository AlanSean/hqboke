importScripts('/cache-polyfill.js');
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/index.html?homescreen=1',
    '/?homescreen=1',
    '/css/index.css',
    '/js/jq.js',
    '/js/powder.js',
    '/js/index.js',
];

self.addEventListener('install', function(event) {
  // 执行安装步骤
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        console.log('打开缓存');
        return cache.addAll(urlsToCache);
    })
  );
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(caches.match(event.request).then(function(response) {
//     // Cache hit - return response
//     if (response) {
//         return response;
//     }
//     // 重要提示:克隆请求。请求是一个流和
//     // 只能消费一次。因为我们在消耗它
//     // 一次缓存一次浏览器获取，我们需要
//     // 克隆响应。
//     var fetchRequest = event.request.clone();
//     return fetch(fetchRequest).then(function(response) {
//         // 检查我们是否收到了有效的响应
//         if(!response || response.status !== 200 || response.type !== 'basic') {
//             return response;
//         }
//
//         // 重要提示:克隆响应。响应是一个流
//         //因为我们希望浏览器使用响应
//         //除了使用响应的缓存之外，我们还需要
//         //克隆它，这样我们就有了两条流。
//         var responseToCache = response.clone();
//         caches.open(CACHE_NAME).then(function(cache) {
//             cache.put(event.request, responseToCache);
//         });
//         return response;
//     });
//   }));
// });




self.addEventListener('fetch', function(event) {

    console.log(event.request.url);

    event.respondWith(

        caches.match(event.request).then(function(response) {

            return response || fetch(event.request);

        })

    );

});
