  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getDatabase, ref, set, get, child, update, remove, push, onChildAdded, onChildRemoved, onChildChanged, query, onValue, limitToLast, limitToFirst, startAt, endAt, startAfter, endBefore, equalTo, orderByValue, orderByKey, orderByChild } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
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
  const Database = getDatabase(App);
  const Auth = getAuth(App);
  Auth.useDeviceLanguage();
  
  async function AuthEmailGoogle(){
    signInWithPopup(Auth, new GoogleAuthProvider());
  }
  
  async function OnAuthChange(fun){
    Auth.onAuthStateChanged((User)=>{
      fun(User);
    });
  }
  
  async function GetCurrentUserDetails(User){
    return new Promise((resolve)=>{
      resolve({
        Uid: User.uid,
        Name: User.displayName,
        Email: User.email,
        Photo: User.photoURL
      })
    })
  }
  
  
 export {  AuthEmailGoogle, OnAuthChange, GetCurrentUserDetails };