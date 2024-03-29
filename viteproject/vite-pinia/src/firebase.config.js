// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3hfBmnrkvLqC0BsYI3jS19sV4kE8QQWg",
  authDomain: "todo-listo-c4f34.firebaseapp.com",
  databaseURL: "https://todo-listo-c4f34-default-rtdb.firebaseio.com",
  projectId: "todo-listo-c4f34",
  storageBucket: "todo-listo-c4f34.appspot.com",
  messagingSenderId: "849847176628",
  appId: "1:849847176628:web:01da2c05809041e3ab76e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize authentication from firebase
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
