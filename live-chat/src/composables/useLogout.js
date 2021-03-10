//handle logic untuk logout method(navbar components)
import { ref } from "vue";
import { projectAuth } from "../firebase/config"; //import this untuk authentication firebase

//global variabel agar tidak ditulis berulg"
const error = ref(null);

const logout = async () => {
    //reset error ketika logout(jika sudha tidk error)
    error.value = null

    //block untuk logout
    try {
        //signout method . firebase mengenali user sudah keluar 
        await projectAuth.signOut()
    }catch(err){
        console.log(err.message)
        error.value = err.message
    }
}

const useLogout = () => {
    return { error,logout }
}

export default useLogout