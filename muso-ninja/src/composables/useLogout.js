//handle logic untuk logout method(navbar components)
import { ref } from "vue";
import { projectAuth } from "../firebase/config"; //import this untuk authentication firebase

//global variabel agar tidak ditulis berulg"
const error = ref(null);
const isPending = ref(false) //pending state ketika request

const logout = async () => {
  //reset error ketika logout(jika sudha tidk error)
  error.value = null;
  isPending.value = true //ketika diklik

  //block untuk logout
  try {
    //signout method . firebase mengenali user sudah keluar
    await projectAuth.signOut();
    isPending.value = false; //start request
  } 
  catch (err) {
    console.log(err.message);
    isPending.value = false; //request error
    error.value = err.message;
  }
};

const useLogout = () => {
  return { error, logout, isPending };
};

export default useLogout;
