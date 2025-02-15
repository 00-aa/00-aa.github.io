  /*
  let RecaptchaDiv = document.getElementById('recaptcha_container');
  import { CreateRecaptcha, SendVerificationCode, CurrentUser, VerifyCode } from '/firebase.js';
  
  CurrentUser().then((User)=>{
    if(User){
      //Valid entry
    }else{
      window.location.href = '/AUTH/E-MAIL/index.html';
    }
  });
  
  let PhoneNum;
  main_phone_auth_form.onsubmit=()=>{
    PhoneNum = String(main_sel_country.value + main_inp_phone.value);
    MoveToStage(2);
    VerifyHuman();
    return false;
  }
  
  function VerifyHuman(){
    CreateRecaptcha(RecaptchaDiv, (response)=>{
      //RecaptchaVerifide
      MoveToStage(3);
      VerifyPhoneNum();
    },()=>{
      //RecaptchaFailed
      MoveToStage(1);
    });
  }
  
  let VerificationCode;
  function VerifyPhoneNum(){
    SendVerificationCode(PhoneNum).then((Result)=>{
      main_phone_auth_code_verify.onsubmit=()=>{
        VerificationCode = String(main_auth_code_inp.value);
        VerifyCode(Result, VerificationCode).then((User)=>{
          if(User){
            alert('welcome to RK');
          }else{
            MoveToStage(1);
          }
        })
        return false;
      }
    });
  }
  
  MoveToStage(1);
  function MoveToStage(ToStage){
    main_phone_auth_code_verify.style.display = 'none';
    main_recaptcha_form.style.display = 'none';
    main_phone_auth_form.style.display = 'none';
    switch(ToStage){
      case 1:
        main_phone_auth_form.style.display = 'grid';
      break;
      case 2:
        main_recaptcha_form.style.display = 'grid';
      break;
      case 3:
        main_phone_auth_code_verify.style.display = 'grid';
      break;
    }
  }