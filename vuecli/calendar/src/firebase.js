import firebase from "firebase/app"; // Import firebase
import "firebase/firestore"; // the tables in firebase are called firestore
import "firebase/auth"; // Lib in charge of authentication in firebase
import "firebase/storage"; // lib in charge of storing

const firebaseConfig = {
  apiKey: "AIzaSyCkYH4wLMGfUZ8Hf2ET-RXXR3EvazgpBmw",
  authDomain: "authentication-58320.firebaseapp.com",
  databaseURL: "https://authentication-58320.firebaseio.com",
  projectId: "authentication-58320",
  storageBucket: "authentication-58320.appspot.com",
  messagingSenderId: "380857153152",
  appId: "1:380857153152:web:5b082205226b9fa408d865",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); // const used to work with tables in firestore
const auth = firebase.auth(); // const used to work with auth in firestore
const storage = firebase.storage(); // const used to work with storage in firestore (images and files)

export { firebase, db, auth, storage };
