import firebase from 'firebase/app' // Import firebase 
import 'firebase/firestore' // the tables in firebase are called firestore

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBFKZWaEpKVtJgl-TlWmvsuM6nsvhARY2g",
    authDomain: "pokemon-afdd.firebaseapp.com",
    databaseURL: "https://pokemon-afdd.firebaseio.com",
    projectId: "pokemon-afdd",
    storageBucket: "pokemon-afdd.appspot.com",
    messagingSenderId: "308948632737",
    appId: "1:308948632737:web:d6468b0cf1a99c51e6dce0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export{db};

