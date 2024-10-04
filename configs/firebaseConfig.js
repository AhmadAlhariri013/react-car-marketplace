// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmUfIDkuiER5Bt9Jkw617T6RlEwXrNKTg",
  authDomain: "car-marketplace-9ef83.firebaseapp.com",
  projectId: "car-marketplace-9ef83",
  storageBucket: "car-marketplace-9ef83.appspot.com",
  messagingSenderId: "715643668982",
  appId: "1:715643668982:web:e66482e1e4ffa022d51fd7",
  measurementId: "G-82E31QDX12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
