const STATIC_CACHE_NAME = "site-static";

const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/icons/favicon-32x32.png",
    "../src/images/loader.gif"
];



// call install event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then((cache) => {
                cache.addAll(assets),
                console.log("cache & sw installed") // add all assets to cache
            })
        )
})


// call activate event
self.addEventListener("activate", (event) => {
    // remove unwanted caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName !== STATIC_CACHE_NAME;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
                );
        })
    );
});


// call fetch event - caching policy: offline behavior
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
             // Cache hit - return response
             if (response) {
                return response;
            }

            return fetch(event.request)
                .then( response => {
                    // Return the response if it is not a valid one.
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone and cache the respone if it is a valid one.
                    var responseToCache = response.clone();
                    caches.open(STATIC_CACHE_NAME)
                        .then( cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
            })
    }));
        
});


