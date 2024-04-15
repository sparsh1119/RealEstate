// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-9ac18.firebaseapp.com",
  projectId: "realestate-9ac18",
  storageBucket: "realestate-9ac18.appspot.com",
  messagingSenderId: "264665760283",
  appId: "1:264665760283:web:bc8b04035b40fd8f0c2ebe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);