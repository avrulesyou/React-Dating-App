import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCu09bKI-PHODazMmNIeFFbHRViX9p7Pz8",
  authDomain: "kupple-829b2.firebaseapp.com",
  projectId: "kupple-829b2",
  storageBucket: "kupple-829b2.appspot.com",
  messagingSenderId: "122167009893",
  appId: "1:122167009893:web:53c4c773b2cbf2ddd85c8c",
  measurementId: "G-HLKE9T6YT8",
};

firebase.initializeApp(firebaseConfig);
