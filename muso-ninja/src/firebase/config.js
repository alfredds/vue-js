//firebase configurations
import firebase from 'firebase/app'
import 'firebase/firestore' //for firebase feature handle backend
import 'firebase/auth' // feature handle authentication service
import 'firebase/storage' // feature storage service

const firebaseConfig = {
    apiKey: "AIzaSyBkF0yyRNENr-cbm_lpkPVdFK9O51HUrAw",
    authDomain: "muso-ninja-b67ff.firebaseapp.com",
    projectId: "muso-ninja-b67ff",
    storageBucket: "muso-ninja-b67ff.appspot.com",
    messagingSenderId: "791017769550",
    appId: "1:791017769550:web:4743ad8a98a4ea7c23111f"
  };

  //init firebase config
  firebase.initializeApp(firebaseConfig)

  //init services firestore(setup connection to firestore)
  const projectFirestore = firebase.firestore()

  //init firebase authentication(sign up and login to firebase)
  const projectAuth = firebase.auth()

  //storage service
  const projectStorage = firebase.storage() 

  //init timestamp for create/written data to collection(firestore)
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, projectAuth, projectStorage, timestamp }