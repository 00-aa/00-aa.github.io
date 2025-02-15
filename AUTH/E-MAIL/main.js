  let GoogleAuthButton = document.getElementById('main_auth_google');
  let FacebookAuthButton = document.getElementById('main_auth_facebook');
  let AppleAuthButton = document.getElementById('main_auth_apple');
  
  import { AuthEmailGoogle, CurrentUser, OnAuthChange } from '/firebase.js';
  
  GoogleAuthButton.onclick = AuthEmailGoogle;
  FacebookAuthButton.onclick = AuthEmailGoogle;
  AppleAuthButton.onclick = AuthEmailGoogle;
  
  OnAuthChange((User)=>{
    if(User){
      window.location.href = '/AUTH/PHONE/index.html';
    }else{
      //User Not Found
    }
  })
