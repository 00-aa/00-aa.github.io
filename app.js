
  import { OnAuthChange } from '/firebase.js';
  
  OnAuthChange((CurrUser)=>{
    if(CurrUser){
      
      if(location.pathname === '/AUTH/E-MAIL/index.html'){
        location.href = '/HOME/index.html';
      }
      
    }else{
      window.stop();
      if(!(location.pathname === '/AUTH/E-MAIL/index.html')){
        location.href = '/AUTH/E-MAIL/index.html';
      }
    }
  });
  
  // REGISTER SEVICE-WORKER
  const ServiceWorkerFileUrl = "/service-worker.js";
  if(!(navigator.serviceWorker || "serviceWorker" in navigator)){
    confirm('SERVICE-WORKER NOT SUPPORTED BY BROWSER :)');
  }else if((navigator.serviceWorker && "serviceWorker" in navigator)){
    navigator.serviceWorker.register(ServiceWorkerFileUrl).then((SWRegistration)=>{
      console.warn('SERVICE-WORKER REGISTERED SUCCESSFULLY');
      // Trigger SW PWA INSTALL
      fetch('/0.png').then(()=>{
        console.log('PWA FETCH!')
      })
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
  