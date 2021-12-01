import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB6FMwFF0rNscVUIXChi3aDkE_K9jYnKpY",
    authDomain: "greendiary-2ac70.firebaseapp.com",
    projectId: "greendiary-2ac70",
    storageBucket: "greendiary-2ac70.appspot.com",
    messagingSenderId: "58983251051",
    appId: "1:58983251051:web:b358d048f20b146d7fc52e",
    measurementId: "G-2L7ZXGGXEE"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

export {
    firebaseConfig,
    firestore,
    firebase
}