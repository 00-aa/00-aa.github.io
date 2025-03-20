// MAIN CACHE CONFIG
  const ToCacheFileList = [
    "/"
  ],CacheName = 'v1.0',
  ErrorIndex = '/HOME/index.html';
  
  
// CACHE ALL FILES WHEN INSTALLED
  self.addEventListener('install',(event)=>{
    event.waitUntil(
      caches.open(CacheName).then((cache)=>{
        return cache.addAll(ToCacheFileList);
      }).then(()=>{
        return self.skipWaiting();
      })
    )
  });
  
  
// FETCH OFFLINE CACHE ON REQUEST
  self.addEventListener('fetch',(event)=>{
    event.respondWith(
      caches.match(event.request).then((response)=>{
        return response || fetch(event.request);
      }).catch((err)=>{
        return caches.match(`${ErrorIndex}?err=${err}`);
      })
    )
  });
  
  
// DELETE OLD CACHES & UPDATE CACHE
  self.addEventListener('activate',(event)=>{
    event.waitUntil(
      caches.keys().then((StoredCacheNameList)=>{
        return Promise.all(
          StoredCacheNameList.map((StoredCache)=>{
            if(StoredCache !== CacheName){
              return caches.delete(StoredCache);
            }
          })
        )
      })
    )
  });
