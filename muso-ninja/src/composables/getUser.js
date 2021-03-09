//menangani router/mencegah direct link ke chat room ketika user tidak login(navbar components)
import { ref } from "vue";
import { projectAuth } from "../firebase/config"; //import this untuk authentication firebase

//const ini digunakan untuk current user yang login
const user = ref(projectAuth.currentUser)

//method ini digunakan ketika ada perubahan status di authentication. _user untuk mencegah tabrakan dengan const user(agar tidak termixed up)
projectAuth.onAuthStateChanged(_user => {
    //memonitor setiap ada perubahan auth
    //log ini digunakan untuk mengetahui perubahan yang terjadi pada user
    console.log("user stated change. current user is: ", _user)
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser