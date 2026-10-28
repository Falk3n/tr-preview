// Concept service worker: cache the app shell + exercise clips so replays are instant and survive gym Wi-Fi.
const C = 'tr-app-v1';
const SHELL = ['./', './index.html', '../assets/concept-bar.css', '../assets/concept-bar.js',
  '../assets/img/anatomy-runner-sm.jpg', '../assets/img/box-coach-sm.jpg', '../assets/img/darren-portrait.jpg'];
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (e.request.headers.has('range')) return; // let the browser stream video ranges natively
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok && /\.(jpg|css|js|html)$|\/$/.test(u.pathname)) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); }
    return r;
  })));
});
