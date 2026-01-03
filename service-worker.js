// Sofort aktiv werden
self.addEventListener("install", event => {
  self.skipWaiting();
});

// Neue Version sofort übernehmen
self.addEventListener("activate", event => {
  clients.claim();
});

// Immer die neueste Datei laden
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});

