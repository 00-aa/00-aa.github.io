// MAIN CACHE CONFIG
  const ToCacheFileList = [
    '/0.png',
    '/index.html',
    '/app.css',
    '/app.js',
    '/firebase.js',
    
    '/ASSETS/BACKGROUNDS/0.jpeg',
    '/ASSETS/BACKGROUNDS/1.jpeg',
    '/ASSETS/BACKGROUNDS/2.jpeg',
    '/ASSETS/BACKGROUNDS/3.jpeg',
    
    '/ASSETS/BANNERS/1.jpg',
    '/ASSETS/BANNERS/2.jpg',
    '/ASSETS/BANNERS/3.jpg',
    '/ASSETS/BANNERS/4.jpg',
    
    '/ASSETS/FONTS/0.ttf',
    
    '/ASSETS/ICONS/apple.svg',
    '/ASSETS/ICONS/back.svg',
    '/ASSETS/ICONS/basket.svg',
    '/ASSETS/ICONS/box.svg',
    '/ASSETS/ICONS/car.svg',
    '/ASSETS/ICONS/cart.svg',
    '/ASSETS/ICONS/error.svg',
    '/ASSETS/ICONS/facebook.svg',
    '/ASSETS/ICONS/farm.svg',
    '/ASSETS/ICONS/github.svg',
    '/ASSETS/ICONS/google.svg',
    '/ASSETS/ICONS/loader.svg',
    '/ASSETS/ICONS/mail.svg',
    '/ASSETS/ICONS/message.svg',
    '/ASSETS/ICONS/microsoft.svg',
    '/ASSETS/ICONS/sell.svg',
    '/ASSETS/ICONS/services.svg',
    '/ASSETS/ICONS/twitter.svg',
    '/ASSETS/ICONS/offers.svg',
    '/ASSETS/ICONS/user.svg',
    '/ASSETS/ICONS/whatsapp.svg',
    
    '/AUTH/E-MAIL/index.html',
    '/AUTH/E-MAIL/main.js',
    '/AUTH/E-MAIL/style.css',
    
    '/HOME/index.html',
    '/HOME/main.js',
    '/HOME/style.css',
    
    
  ],CacheName = 'v1.10',
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