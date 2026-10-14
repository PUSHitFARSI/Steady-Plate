// Simple offline cache so the app works without internet once opened.
// Bump the version when you change recipes so phones pick up the update.
const CACHE = "steady-plate-v12";
const FILES = ["./", "index.html", "recipes.js", "recipes-more.js", "recipes-extra.js", "recipes-family.js", "swaps.js", "i18n.js", "guide.js", "nutrition.js", "tr-sv.js", "tr-fa.js", "tr-ar.js", "tr-nb.js", "tr-da.js", "tr-fi.js", "tr-de.js", "tr-fr.js", "tr-es.js", "tr-it.js", "tr-el.js", "tr-tr.js", "tr-pl.js", "app.js", "manifest.json", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "favicon-32.png", "logo.png", "photos-1.js", "photos-2.js", "photos-3.js", "photos-4.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

// Network first, fall back to cache when offline.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
