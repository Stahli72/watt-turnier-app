// Sofort aktiv werden (update 1)
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

// Kleine Änderung, um ein Update zu erzwingen
console.log("Service Worker Version 1.1 geladen");
