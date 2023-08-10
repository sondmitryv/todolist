// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkN5EqWlzad6A2iBfB_NYirO0GgUp00vk",
  authDomain: "to-do-list-b0733.firebaseapp.com",
  projectId: "to-do-list-b0733",
  storageBucket: "to-do-list-b0733.appspot.com",
  messagingSenderId: "794592836855",
  appId: "1:794592836855:web:688caa8106f8c7d45da7f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}