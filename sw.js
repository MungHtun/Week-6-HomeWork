const cacheName = 'v1';
const cacheAssets = [
    'index.html',
    '/css/game.css',
    '/js/controller/controller.js',
    '/js/model/gameModel.js',
    '/js/model/Player.js',
    '/js/view/gameView.js',
    '/js/view/registerView.js',
    '/js/app.js',
    '/images/logo.png'
];


self.addEventListener('install', (e) => {

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Catching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );

});


self.addEventListener('activate', (e) => {

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );

});

self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});





  
