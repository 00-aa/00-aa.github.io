  //debug console
  (function(){var script=document.createElement('script');script.src="https://cdn.jsdelivr.net/npm/eruda";document.body.append(script);script.onload=function(){eruda.init()}})();
  
  import { OnAuthChange } from '/firebase.js';
  
  //INSTANT REDIRECT AUTH
  if( (!(localStorage.getItem('RKUserValid')) || !(localStorage.getItem('RKUserValid') === 'true')) && !(location.pathname === '/AUTH/E-MAIL/index.html') ){
    //login expired
    document.write('<!--');
    location.href = '/AUTH/E-MAIL/index.html';
  }
  
  //FIREBASE AUTH
  OnAuthChange((CurrUser)=>{
    if(CurrUser){
      localStorage.setItem('RKUserValid','true');
      localStorage.setItem('RKLastLogIn',new Date().toString());
    }else{
      localStorage.setItem('RKUserValid','false')
      if(!(location.pathname === '/AUTH/E-MAIL/index.html')){
        document.write('<!--');
        location.href = '/AUTH/E-MAIL/index.html';
      }
    }
  });
  
  
  
  //PWA THINGS
  addEventListener('load',()=>{
    // REGISTER SEVICE-WORKER
    const ServiceWorkerFileUrl = "https://00-aa.github.io/service-worker.js";
    if(!(navigator.serviceWorker || "serviceWorker" in navigator)){
      confirm('SERVICE-WORKER NOT SUPPORTED BY BROWSER :)');
    }else if((navigator.serviceWorker && "serviceWorker" in navigator)){
      navigator.serviceWorker.register(ServiceWorkerFileUrl).then((SWRegistration)=>{
        console.warn('SERVICE-WORKER REGISTERED SUCCESSFULLY');
        // Trigger SW FOR PWA INSTALL
        fetch(ServiceWorkerFileUrl);
        
        SWRegistration.onupdatefound=()=>{
          SWRegistration.update().then(()=>{
            console.warn('SERVICE-WORKER UPDATED SUCCESSFULLY');
          }).catch((err)=>{
            confirm(err);
          })
        }
      }).catch((err)=>{
        confirm(err);
      })
    };
    
    // CUSTOMIZE PWA INSTALL PROMPT
    window.addEventListener("beforeinstallprompt",(event)=>{
      event.preventDefault();
      window.PWAInstallprompt = event;
      console.warn('WEBSITE IS REDY TO DOWNLOAD AS PWA');
      
      onclick=()=>{
        PWAInstallprompt.prompt();
      }
    });
    
  });
  
