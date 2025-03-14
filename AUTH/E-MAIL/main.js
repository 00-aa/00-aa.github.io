  import { AuthEmailGoogle, OnAuthChange } from '/firebase.js';
  
  let GoogleAuthButton = document.getElementById('btn_auth_google');
  let FacebookAuthButton = document.getElementById('btn_auth_facebook');
  let AppleAuthButton = document.getElementById('btn_auth_apple');
  
  GoogleAuthButton.onclick = AuthEmailGoogle;
  FacebookAuthButton.onclick = AuthEmailGoogle;
  AppleAuthButton.onclick = AuthEmailGoogle;
  
  OnAuthChange((CurrUser)=>{
    if(CurrUser){
      window.location.href = '/HOME/index.html';
    }
  });
  
  
  