//firebase configuration, import this from module and firebase console(API), with feature firestore(untuk koneksi ke backend firebase)
import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBq52_mrbfm_J77x0zBUL2eWCoA6xPKoo8",
  authDomain: "web-blog-90f9c.firebaseapp.com",
  projectId: "web-blog-90f9c",
  storageBucket: "web-blog-90f9c.appspot.com",
  messagingSenderId: "961411243089",
  appId: "1:961411243089:web:7d98392dd4cfc5e502ec70"
};

  //init firebase and config di atas
  firebase.initializeApp(firebaseConfig)

  //init firestore service(setup connection to firestore)
  const projectFirestore = firebase.firestore()

  //timestamp firestore untuk create post tanpa membuat data collection(data object) didalam firebase
  //fungsi nya untuk menulis data set dan update(create collection otomatis setelah document baru dibuat)
  const timestamp = firebase.firestore.FieldValue.serverTimestamp


  //export objek project
  export { projectFirestore, timestamp }
