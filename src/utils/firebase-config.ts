// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAzjNP_BwWdwF7o8E-JcxKoedvdDIdV7Ik",
//   authDomain: "converse-on.firebaseapp.com",
//   projectId: "converse-on",
//   storageBucket: "converse-on.appspot.com",
//   messagingSenderId: "101153326138",
//   appId: "1:101153326138:web:8474767a83c5fb1d9b6103",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app);


// Test Details
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFK4UH2FWIN-_HaWqmjwvoA4LLAhsfh-E",
  authDomain: "converse-1-test.firebaseapp.com",
  projectId: "converse-1-test",
  storageBucket: "converse-1-test.appspot.com",
  messagingSenderId: "702019183212",
  appId: "1:702019183212:web:5887017c9d863f3436ee49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);