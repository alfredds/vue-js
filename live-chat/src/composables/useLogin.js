//handle logic untuk login form
import { ref } from "vue";
import { projectAuth } from "../firebase/config"; //import this untuk signup form

//global variabel agar tidak ditulis berulg"
const error = ref(null);

//const login ini sebagai return value(object value) untuk useLogin, jadi tidak perlu di export
//nilai parameter dr login berada pd login form
const login = async (email, password) => {
    //reset error ketika login
    error.value=null;

    //block promise ketika menangani login
    try {
        //mengambil service auth dr firebase
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        
        //ketika success login
        error.value = null
        
        //cetak nilai response, kembalikan nilai res login nya untuk digunakan didalam component 
        console.log(res)
        return res

    }catch(err){
        console.log(err.message)
        error.value = 'Incorect login credentials'
    }
}


const useLogin = () => {
    return {error, login}
}

export default useLogin