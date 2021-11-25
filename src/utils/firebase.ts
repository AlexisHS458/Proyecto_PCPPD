import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC6gxhINyjRetBOkPsTwuF1Jcm7veQJ02Y",
  authDomain: "pair-programming-7ea55.firebaseapp.com",
  projectId: "pair-programming-7ea55",
  storageBucket: "pair-programming-7ea55.appspot.com",
  messagingSenderId: "864529477380",
  appId: "1:864529477380:web:d66ace4b304eee3ac02a51",
  measurementId: "G-V7ZRHWMHPP"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

//Funcionalidades de Firebase
const auth = firebase.auth();
const db = firebase.firestore();
const realTime = firebase.database();
const FieldValue = firebase.firestore.FieldValue;
const storage = firebase.storage();

export { auth, firebase, db, realTime, FieldValue, storage };
