const cache_v = 'a2',
cache_all = [],

statics = [];


this.addEventListener('install',e=>{
  console.log("Installing Service Worker");
  console.log("Storing Static Data");
  e.waitUntil(
    caches.open(cache_all[0])
    .then(cac=>cac.addAll(statics))
    .catch(er=>console.error(er))
  )
  console.log("Installation Complete");
});

this.addEventListener('activate',e=>{
  console.log("Service worker activated, now clearing obsolete data");
})

this.addEventListener('fetch',e=>{
    if(e.request.url === 'https://free.currencyconverterapi.com/api/v5/currencies'){
       console.log("IndexDB Reqrd");
       let db = idb.open('Converter')
       .then(d=>{
        let ob = d.transaction('currency');
        let data = ob.objectStore('currency');
        let fd = data.getAll()
        .then(dt=>{
            return dt;
        })
    })
}
else{
    e.respondWith(caches.match(e.request)
    .then((res)=>{
        return res || fetch(e.request).then(res=>{if(res.status === 404)
        return new Response("Not Found");});
    })
    )
}
console.log('fetched');
})
