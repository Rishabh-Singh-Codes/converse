// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzjNP_BwWdwF7o8E-JcxKoedvdDIdV7Ik",
  authDomain: "converse-on.firebaseapp.com",
  projectId: "converse-on",
  storageBucket: "converse-on.appspot.com",
  messagingSenderId: "101153326138",
  appId: "1:101153326138:web:8474767a83c5fb1d9b6103"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();