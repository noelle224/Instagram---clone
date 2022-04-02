// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// write in your own firebase configurations.

  const firebaseApp = firebase.initializeApp({
    apiKey: "//",
    authDomain: "//",
    projectId: "//",
    storageBucket: "//",
    messagingSenderId: "//",
    appId: "1//",
    measurementId: "//"
  });
  
  const db= firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();

  export {db, auth, storage};
