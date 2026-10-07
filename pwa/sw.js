/* ============================================================================
   ReSTOCK PWA — service worker
   ============================================================================
   Užduotis: padaryti apvalkalą (shell) įdiegiamu ir atidaryti jį akimirksniu.

   SVARBU: service worker NIEKADA neliečia kryžminio (cross-origin) srauto.
   Pats ReSTOCK turinys gyvena `script.google.com` iframe'e — jei SW bandytų
   jį kešuoti ar perrašyti, sulaužytume `google.script.run` ryšį.
   Todėl: kešuojamas TIK šio origin'o apvalkalas, viskas kita — tiesiai į tinklą.
   ========================================================================== */

/* 🔴 Versiją KELKITE kiekvieną kartą pakeitę apvalkalo failus — kitaip
   įdiegta programėlė ir toliau rodys seną `index.html` iš talpyklos. */
const CACHE = 'restock-shell-v2';

const SHELL = [
  './',
  './index.html',
  './config.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-48.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      /* Kiekvienas failas kešuojamas atskirai: jei vieno nėra (pvz., dar
         nesugeneruotos PNG ikonos), likęs apvalkalas vis tiek įkešuojamas.
         🔴 `cache: 'reload'` apeina HTTP talpyklą — kitaip po versijos
         pakėlimo galėtume įkešuoti SENĄ `index.html`. */
      .then((cache) => Promise.all(SHELL.map((u) =>
        cache.add(new Request(u, { cache: 'reload' })).catch(() => null))))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }

  /* Kitas origin'as (Google, CDN, Drive nuotraukos) — neliečiame. */
  if (url.origin !== self.location.origin) return;

  /* Navigacija: visada grąžiname apvalkalą (jis ir yra „programėlė"). */
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html')
        .then((hit) => hit || fetch(req))
        .catch(() => fetch(req))
    );
    return;
  }

  /* Kitas apvalkalo failas: kešas pirma, tinklas atsarginis. */
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});
