// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFqM15fZhc5ofrbtJxy2R9uS6Z-GULjgc",
  authDomain: "email-auth-569bb.firebaseapp.com",
  projectId: "email-auth-569bb",
  storageBucket: "email-auth-569bb.appspot.com",
  messagingSenderId: "36063553843",
  appId: "1:36063553843:web:f279061d4c0c5b1955f646"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;