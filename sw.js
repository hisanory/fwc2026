const CACHE = 'fwc2026-v2';
const ASSETS = [
  '/fwc2026/',
  '/fwc2026/index.html',
  '/fwc2026/seattle/',
  '/fwc2026/seattle/index.html',
  '/fwc2026/vancouver/',
  '/fwc2026/vancouver/index.html',
  '/fwc2026/manifest.json'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    const clone = res.clone();
    caches.open(CACHE).then(c => c.put(e.request, clone));
    return res;
  }).catch(() => caches.match('/fwc2026/'))));
});
