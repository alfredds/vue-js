//handle logic untuk login form
import { ref } from "vue";
import { projectAuth } from "../firebase/config"; //import this untuk signup form

//global variabel agar tidak ditulis berulg"
const error = ref(null);
const isPending = ref(false); //pending state ketika user melakukan request(nilai awal user tidak melakukan request/gagal request)

//const login ini sebagai return value(object value) untuk useLogin, jadi tidak perlu di export
//nilai parameter dr login berada pd login form
const login = async (email, password) => {
    //reset error ketika login
    error.value = null;
    //request sign in
    isPending.value = true;

    //block promise ketika menangani login
    try {
        //mengambil service auth dr firebase
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        
        //ketika success login
        error.value = null

        //ketika sedang melakukan request, untuk disabled button(loading..)
        isPending.value = false
        
        //kembalikan nilai res login nya untuk digunakan didalam component (in future)
        return res

    }catch(err){
        console.log(err.message)
        isPending.value = false
        error.value = 'Incorect login credentials'
    }
}


const useLogin = () => {
    return {error, login, isPending}
}

export default useLogin