//firebase configuration,
import firebase from "firebase/app"
import 'firebase/firestore' //for firebase feature handle backend
import 'firebase/auth' // feature handle authentication

const firebaseConfig = {
    apiKey: "AIzaSyCjhJM_5YjqZOwXkAOyM1BUTEEXVSG8YSk",
    authDomain: "vue-firebase-sites-b795c.firebaseapp.com",
    projectId: "vue-firebase-sites-b795c",
    storageBucket: "vue-firebase-sites-b795c.appspot.com",
    messagingSenderId: "437562864400",
    appId: "1:437562864400:web:831a613fbbcf5caafbeb95"
  };

  //init firebase(config)
  firebase.initializeApp(firebaseConfig)

  //init firestore(setup conection to firestore)
  const projectFirestore = firebase.firestore()

  //init firebase authentication(sign up and login to firebase)
  const projectAuth = firebase.auth()

  //init timestamp for create/written data to collection(firestore)
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, projectAuth, timestamp }