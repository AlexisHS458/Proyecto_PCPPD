import firebase from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6gxhINyjRetBOkPsTwuF1Jcm7veQJ02Y",
  authDomain: "pair-programming-7ea55.firebaseapp.com",
  projectId: "pair-programming-7ea55",
  storageBucket: "pair-programming-7ea55.appspot.com",
  messagingSenderId: "864529477380",
  appId: "1:864529477380:web:d66ace4b304eee3ac02a51",
  measurementId: "G-V7ZRHWMHPP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export {auth};