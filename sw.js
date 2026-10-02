const CACHE_NAME = 'prossahel-mc-v10-cache';
const URLS_TO_CACHE = ['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./superviseur.html',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js'];

self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLS_TO_CACHE).catch(err=>console.warn(err))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(names=>Promise.all(names.map(n=>n!==CACHE_NAME?caches.delete(n):null))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.url.includes('googleapis.com')||e.request.url.includes('accounts.google.com')||e.request.url.includes('firebase'))return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res&&res.status===200)caches.open(CACHE_NAME).then(c=>c.put(e.request,res.clone()));return res;}).catch(()=>e.request.destination==='document'?caches.match('./index.html'):null)));
});