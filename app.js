  import { OnAuthStateChanged } from "/firebase.js";
  
  //INSTANT REDIRECT AUTH
  if(!(localStorage.getItem("RKUserValid") === "true") && !(location.pathname === "/AUTH/E-MAIL/index.html") ){
    //login expired
    location = "/AUTH/E-MAIL/index.html";
  }
  
  //FIREBASE AUTH
  OnAuthStateChanged((CurrUser)=>{
    if(CurrUser){
      localStorage.setItem("RKUserValid","true");
      if(location.pathname === "/"){
        location = "/HOME/index.html";
      }
    }else{
      if(!(location.pathname === "/AUTH/E-MAIL/index.html")){
        location = "/AUTH/E-MAIL/index.html";
      }
    }
  });
  
  //PWA THINGS
  addEventListener("load",()=>{
    // REGISTER SEVICE-WORKER
    const ServiceWorkerFileUrl = "/service-worker.js";
    if(!(navigator.serviceWorker || "serviceWorker" in navigator)){
      confirm("SERVICE-WORKER NOT SUPPORTED BY BROWSER :)");
    }else if(navigator.serviceWorker.controller){
      console.warn("SERVICE-WORKER ALREDY REGISTERED");
    }else if((navigator.serviceWorker || "serviceWorker" in navigator) && !(navigator.serviceWorker.controller)){
      navigator.serviceWorker.register(ServiceWorkerFileUrl).then((SWRegistration)=>{
        console.warn("SERVICE-WORKER REGISTERED SUCCESSFULLY");
        // Trigger SW FOR PWA INSTALL
        fetch(ServiceWorkerFileUrl);
        
        SWRegistration.onupdatefound=()=>{
          SWRegistration.update().then(()=>{
            console.warn("SERVICE-WORKER UPDATED SUCCESSFULLY");
          }).catch((err)=>{
            console.error(err);
          })
        }
      }).catch((err)=>{
        console.error(err);
      })
    }else{
      console.error("SERVICE-WORKER NOT REGISTERED DUE TO UNKNOWN ERROR");
    }
    
    // CUSTOMIZE PWA INSTALL PROMPT
    window.addEventListener("beforeinstallprompt",(event)=>{
      event.preventDefault();
      window.PWAInstallprompt = event;
      console.warn("WEBSITE IS REDY TO DOWNLOAD AS PWA");
      
      onclick = ()=>{
        PWAInstallprompt.prompt();
      }
    });
  });
  
