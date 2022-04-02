// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDcd5uwT5EE6BpN9P-pbO8tr8w6k0eVKpU",
    authDomain: "instagram-clone-5dad7.firebaseapp.com",
    projectId: "instagram-clone-5dad7",
    storageBucket: "instagram-clone-5dad7.appspot.com",
    messagingSenderId: "821551780776",
    appId: "1:821551780776:web:cee867a3bd550e31bdc39d",
    measurementId: "G-B51BKCWM0N"
  });
  
  const db= firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();

  export {db, auth, storage};
