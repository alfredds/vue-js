//untuk mengambil data chat yang dikirim ke database cloud firestore
import { ref } from 'vue'
import { projectFirestore } from '../firebase/config' //untuk interaksi dengan database

const useCollection = (collection) => {
    const error = ref(null) //fungsi ini ditaruh didalam karena menggunakan user berbeda dalam satu waktu 

    //fungsi untuk berhubungan dengan database firestore dr PrjectFirestore
    const addDoc = async (doc) => {
        error.value = null //untuk setiap memulai request reset error

        //agar collection bs diruseable gunakan fungsi (collection) didalam usecollection(composables function) untuk firebase cloud firestore
        try {
            await projectFirestore.collection(collection).add(doc)
        }catch(err) {
            console.log(err.message)
            error.value = 'Could not send a message'
        }
    }
    return { error, addDoc}
}

export default useCollection
