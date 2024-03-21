// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXjYmRpzu5-Wq3V774aIuMBjzy_Hn2Axw",
  authDomain: "trellonextjs.firebaseapp.com",
  projectId: "trellonextjs",
  storageBucket: "trellonextjs.appspot.com",
  messagingSenderId: "932051742732",
  appId: "1:932051742732:web:4ef72b1f129cfa68987e29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
