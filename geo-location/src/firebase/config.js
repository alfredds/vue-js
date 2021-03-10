import firebase from 'firebase/app'
import 'firebase/firestore' //firestore services(backend)
import 'firebase/auth' //feature handle authentication service

const firebaseConfig = {
  apiKey: "AIzaSyBHn46EX6WYMTQbVEwEZqXD11D_lE7sBQc",
  authDomain: "geo-location-18cd4.firebaseapp.com",
  projectId: "geo-location-18cd4",
  storageBucket: "geo-location-18cd4.appspot.com",
  messagingSenderId: "955611658525",
  appId: "1:955611658525:web:be5140711a874a4870c9f4"
};

//init app
firebase.initializeApp(firebaseConfig)

//use cloud firestore services
const projectFirestore = firebase.firestore()

//init firebase authentication(sign up and login to firebase)
const projectAuth = firebase.auth()

//init timestamp 
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp}