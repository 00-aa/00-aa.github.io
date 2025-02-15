  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  //import { getDatabase, ref, set, get, child, update, remove, push, onChildAdded, onChildRemoved, onChildChanged, query, onValue, limitToLast, limitToFirst, startAt, endAt, startAfter, endBefore, equalTo, orderByValue, orderByKey, orderByChild } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, signInWithPhoneNumber, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
  const FirebaseConfig = {
    apiKey: "AIzaSyCHXWdycKjQ4P2hwHZKXR6Q-EwQ6wtnl3g",
    authDomain: "rkservices-01.firebaseapp.com",
    databaseURL: "https://rkservices-01-default-rtdb.firebaseio.com",
    projectId: "rkservices-01",
    storageBucket: "rkservices-01.firebasestorage.app",
    messagingSenderId: "601343904145",
    appId: "1:601343904145:web:d7497789fafa07acc33230",
    measurementId: "G-51K74PGW7F"
  };
  
  // Initialize Firebase
  const App = initializeApp(FirebaseConfig);
  //const Database = getDatabase(App);
  const Auth = getAuth(App);
  Auth.useDeviceLanguage();
  
  async function AuthEmailGoogle(){
    signInWithPopup(Auth, new GoogleAuthProvider())
  }
  
  async function CurrentUser(){
    return new Promise((resolve)=>{
      Auth.onAuthStateChanged((User)=>{
        if(User){
          resolve([User.uid, User.displayName, User.email, User.photoURL]);
        }
        resolve(false);
      })
    })
  }
  
  async function CreateRecaptcha(RecaptchaContaineraId, RecaptchaVerifide, RecaptchaFailed){
    window.recaptchaVerifier = new RecaptchaVerifier(Auth, RecaptchaContaineraId, {
      'size': 'normal',
      'callback': (response)=>{
        RecaptchaVerifide();
      },
      'expired-callback': ()=>{
        grecaptcha.reset(window.recaptchaWidgetId);
        RecaptchaFailed();
      }
    });
    recaptchaVerifier.render().then((widgetId)=>{
      window.recaptchaWidgetId = widgetId;
      const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
    });
  }
  
  async function SendVerificationCode(PhoneNum){
    return new Promise((resolve, reject) => {
      signInWithPhoneNumber(Auth, PhoneNum, window.recaptchaVerifier).then((Result)=>{
        resolve(Result);
      }).catch((err)=>{
        reject(err);
        grecaptcha.reset(window.recaptchaWidgetId);
      });
    })
  }
  
  async function VerifyCode(Result, Code){
    
    return new Promise((resolve, reject) => {
      Result.confirm(VerificationCode).then((result)=>{
        resolve(result.user);
      }).catch((err)=>{
        reject(err);
        grecaptcha.recet(window.recaptchaWidgetId)
      });
    })
  }
  
  async function OnAuthChange(fun){
    Auth.onAuthStateChanged((User)=>{
      fun(User);
    });
  }
  
 export {  AuthEmailGoogle, CurrentUser, OnAuthChange, CreateRecaptcha, SendVerificationCode, VerifyCode };