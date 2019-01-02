"use strict";
var precacheConfig = [
        ['/','0.03'],
        ['index.html','0.04'],
        ['css/index.css','0.02'],
        ['js/jq.js','0.02'],
        ['js/powder.js','0.02'],
        ['js/index.js','0.02'],
        ['manifest.json','0.02'],
        ['img/head.jpg','0.02'],
        ['favicon.jpg','0.02'],
    ],
    cacheName = "sw-precache-v1-www.hqboke.cn-" + (self.registration ? self.registration.scope : ""),
    ignoreUrlParametersMatching = [/^utm_/],
    addDirectoryIndex = function(e, s) {
        var a = new URL(e);
        return "/" === a.pathname.slice(-1) && (a.pathname += s), a.toString()
    },
    cleanResponse = function(e) {
        return e.redirected ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(s) {
            return new Response(s, {
                headers: e.headers,
                status: e.status,
                statusText: e.statusText
            })
        }) : Promise.resolve(e)
    },
    createCacheKey = function(e, s, a, d) {
        var c = new URL(e);
        return d && c.pathname.match(d) || (c.search += (c.search ? "&" : "") + encodeURIComponent(s) + "=" + encodeURIComponent(a)), c.toString()
    },
    isPathWhitelisted = function(e, s) {
        if (0 === e.length) return !0;
        var a = new URL(s).pathname;
        return e.some(function(e) {
            return a.match(e)
        })
    },
    stripIgnoredUrlParameters = function(e, s) {
        var a = new URL(e);
        return a.hash = "", a.search = a.search.slice(1).split("&").map(function(e) {
            return e.split("=")
        }).filter(function(e) {
            return s.every(function(s) {
                return !s.test(e[0])
            })
        }).map(function(e) {
            return e.join("=")
        }).join("&"), a.toString()
    },
    hashParamName = "_sw-precache",
    urlsToCacheKeys = new Map(precacheConfig.map(function(e) {
        var s = e[0],
            a = e[1],
            d = new URL(s, self.location),
            c = createCacheKey(d, hashParamName, a, /\.\w{8}\./);
        return [d.toString(), c]
    }));

function setOfCachedUrls(e) {
    return e.keys().then(function(e) {
        return e.map(function(e) {
            return e.url
        })
    }).then(function(e) {
        return new Set(e)
    })
}

self.addEventListener("install", function(e) {
    console.log(e,123123);
    e.waitUntil(caches.open(cacheName).then(function(e) {
        return setOfCachedUrls(e).then(function(s) {
            return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a) {
                if (!s.has(a)) {
                    var d = new Request(a, {
                        credentials: "same-origin"
                    });
                    return fetch(d).then(function(s) {
                        if (!s.ok) throw new Error("Request for " + a + " returned a response with status " + s.status);
                        return cleanResponse(s).then(function(s) {
                            return e.put(a, s)
                        })
                    })
                }
            }))
        })
    }).then(function() {
        return self.skipWaiting()
    }))
}), self.addEventListener("activate", function(e) {
    var s = new Set(urlsToCacheKeys.values());
    e.waitUntil(caches.open(cacheName).then(function(e) {
        return e.keys().then(function(a) {
            return Promise.all(a.map(function(a) {
                if (!s.has(a.url)) return e.delete(a)
            }))
        })
    }).then(function() {
        return self.clients.claim()
    }))
}), self.addEventListener("fetch", function(e) {
    if ("GET" === e.request.method) {
        var s, a = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
        (s = urlsToCacheKeys.has(a)) || (a = addDirectoryIndex(a, "index.html"), s = urlsToCacheKeys.has(a));
        !s && "navigate" === e.request.mode && isPathWhitelisted(["^(?!\\/__).*"], e.request.url) && (a = new URL("/", self.location).toString(), s = urlsToCacheKeys.has(a)), s && e.respondWith(caches.open(cacheName).then(function(e) {
            return e.match(urlsToCacheKeys.get(a)).then(function(e) {
                if (e) return e;
                throw Error("The cached response that was expected is missing.")
            })
        }).catch(function(s) {
            return console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, s), fetch(e.request)
        }))
    }
});
