//handle logic untuk sign up form
import { ref } from "vue";
import { projectAuth } from "../firebase/config"; //import this untuk signup form

//global variabel agar tidak ditulis berulg"
const error = ref(null);
const isPending = ref(false) //pending state awal ketika belum request

//const signup ini sebagai return value(object value) untuk useSignup, jadi tidak perlu di export
//nilai paramater signup terdpt pada signupform, error value ini agar ketika masuk kelogin form tidak null/error ke user sampai mendapat respon server
const signup = async (email, password, displayName) => {
  //reset error ketika dijalankan no error
  error.value = null;
  isPending.value = true

  //block try and catch untuk menangani login email dan password
  try {
    //mengambil service auth dr firebase kemudian masukan params signup(email dan password) for response from firebase auth
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    //jika tidak mendapat response from server/ not valid
    if (!res) {
      throw new Error("Could not complete sign up");
    }

    //method untuk displayName. await respon objek user ke updateProfile kemudian displayName(berdasarkan properti firebase)
    await res.user.updateProfile({ displayName });

    //pending request ke server 
    isPending.value = false

    //ketika berhasil login maka tidak perlu tampilkan error
    error.value = null;

    //mengembalikan nilai signup ketika dibutuhkan
    return res

  } catch (err) {
    //ketika data signup yang di input sudah ada tampilkan error
    console.log(err.message);
    error.value = err.message;
    isPending.value = false
  }
};

//untuk fungsi ini jangan di asynchronus atau meneybakan error signup not function
const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
