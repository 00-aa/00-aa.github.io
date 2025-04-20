  import { PopupAuthGoogle, OnAuthStateChanged, IsUserVald } from '/firebase.js';
  
  btn_google_auth_redirect.onclick = ()=>{
    navigator.vibrate(200);
    PopupAuthGoogle().then((CurrentUser)=>{
      if(CurrentUser){
        location = '/HOME/index.html';
      }
    }).catch((err)=>{
      console.error(err);
    });
  }
  
  let UserValidation = await IsUserVald();
  if(UserValidation){
    location = '/HOME/index.html';
  }
  
  OnAuthStateChanged((CurrentUser)=>{
    if(CurrentUser){
      location = '/HOME/index.html';
    }
  }).catch((err)=>{
    console.error(err);
  })