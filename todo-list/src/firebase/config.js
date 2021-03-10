import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB1QfTVBkvyuAO7ZevLHdKreqbh_iX307E",
    authDomain: "todo-list-27914.firebaseapp.com",
    projectId: "todo-list-27914",
    storageBucket: "todo-list-27914.appspot.com",
    messagingSenderId: "640845682822",
    appId: "1:640845682822:web:9e2cfb9407b249c4085907"
  };

  //init firebase and config di atas
  firebase.initializeApp(firebaseConfig)

  const projectFirestore = firebase.firestore()

  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, timestamp}