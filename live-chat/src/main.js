import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//untuk apply css diseluruh body di main.js
import "./assets/main.css";

//import project auth service. untuk initial authentication(otentikasi awal) sebelum ada perubahan user
import { projectAuth } from "./firebase/config"; 

let app;

//fungsi ini mencegah aplikasi render sebelum dilakukan authentikasi diawal untuk berhubungan dengan backend
//agar nilai didalam authentication tidak bernilai null jika user sedang login. Jika user refresh page tidak kembali ke welcome/homescreen karena user sudah login
projectAuth.onAuthStateChanged(() => {
  //jika aplikasi tidak/ belum di authentikasi jalankan ini. 
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount("#app");
  }
});
