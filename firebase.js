  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getDatabase, ref, set, get, child, update, remove, push, onChildAdded, onChildRemoved, onChildChanged, query, onValue, limitToLast, limitToFirst, startAt, endAt, startAfter, endBefore, equalTo, orderByValue, orderByKey, orderByChild } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
  import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup, onAuthStateChanged, signOut, signInWithPhoneNumber, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
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
  
  const Provider = new GoogleAuthProvider({prompt: "select_account"});
  Provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  
  
  
  
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
  
  async function IsAdmin(){
    return new Promise((Resolve)=>{
      try{
        Auth.onAuthStateChanged((User)=>{
          if(User){
            get(ref(Database,'ADMINISTRATORS/'+User.uid)).then((Res)=>{
              if(Res.exists()){
                Resolve(true);
              }else{
                Resolve(false);
              }
            }).catch((err)=>{
              Resolve(false);;
            })
          }else{
            Resolve(false);
          }
        });
      }catch(err){
        Resolve(false);
      }
    });
    return false;
  }
  
  async function OnChildAdded(DbPathToListen = '/', fun){
    onChildAdded(ref(Database, DbPathToListen), (event)=>{
      fun(event);
    })
  }
  
  async function Create(Path = null, Obj = null){
    set(ref(Database, Path),Obj);
  }
  
  async function Delet(Path){
    remove(ref(Database, Path));
  }
  
  async function RandomPath(ParentPath){
    return await push(child(ref(Database), ParentPath)).key;
  }
  
  async function OnAuthStateChanged(Resolve, Reject){
    Auth.onAuthStateChanged((User)=>{
      Resolve(User);
    })
  }
  
  async function IsUserVald(){
    return new Promise((Resolve)=>{
      try{
        Auth.onAuthStateChanged((CurrentUser)=>{
          if(CurrentUser){
            Resolve(true);
          }else{
            Resolve(false);
          }
        })
      }catch(err){
        Resolve(false);
      }
    }).catch((err)=>{
      return false;
    });
    return false;
  }
  
  async function PopupAuthGoogle(){
    return new Promise((Resolve, Reject)=>{
      try{
        signInWithPopup(Auth, Provider).then((CurrentUser)=>{
          Resolve(CurrentUser);
        }).catch((err)=>{
          Reject(err);
        })
      }catch(err){
        Reject(err);
      }
    })
  }
  
  
 export {  IsUserVald, OnAuthStateChanged, PopupAuthGoogle, GetCurrentUserDetails, IsAdmin, OnChildAdded, Create, Delet, RandomPath };