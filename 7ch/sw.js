var staticCacheName = 'converter-v1';

self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/index.html',
        'idb.js',
        'https://free.currencyconverterapi.com/api/v5/currencies'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('converter-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
self.addEventListener('fetch',e=>{
    if(e.request.url === 'https://free.currencyconverterapi.com/api/v5/currencies'){
       console.log("IndexDB Reqrd");
       let db = idb.open('Converter')
       .then(d=>{
        let ob = d.transaction('currency');
        let data = ob.objectStore('currency');
        let fd = data.getAll()
        .then(dt=>{
            return dt;
        })})}
console.log('fetched');})
