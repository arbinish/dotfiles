/**
 * AvanzaMath - Service Worker
 * Network-First Strategy: Always loads newest files live from network/disk.
 * Falls back to offline cache ONLY when disconnected from the internet.
 */

const CACHE_NAME = 'avanzamath-v1.3.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './icons/icon.svg',
  './js/i18n.js',
  './js/audio.js',
  './js/state.js',
  './js/modules/profileModal.js',
  './js/modules/welcome.js',
  './js/modules/fruitStand.js',
  './js/modules/panaderia.js',
  './js/modules/mercado.js',
  './js/modules/pinata.js',
  './js/modules/loteria.js',
  './js/modules/familyPortal.js',
  './js/app.js'
];

// Install: Pre-cache core shell & immediately take over
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate: Delete all previous stale cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Cleaning old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First Strategy (Zero Stale Caching)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Only if network fails (offline), serve from cache
        return caches.match(event.request);
      })
  );
});
