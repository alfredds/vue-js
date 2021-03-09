//untuk mengambil data chat yang dikirim ke database cloud firestore
import { ref } from 'vue'
import { projectFirestore } from '../firebase/config' //untuk interaksi dengan database

const useCollection = (collection) => {
    const error = ref(null) //fungsi ini ditaruh didalam karena menggunakan user berbeda dalam satu waktu
    const isPending = ref(false) //pending state ketika request

    //fungsi untuk berhubungan dengan database firestore dr PrjectFirestore
    const addDoc = async (doc) => {
        error.value = null //untuk setiap memulai request reset error
        isPending.value = true

        //agar collection bs diruseable gunakan fungsi (collection) didalam usecollection(composables function) untuk firebase cloud firestore
        try {
            const res = await projectFirestore.collection(collection).add(doc)
            isPending.value = false //start request
            return res
        }catch(err) {
            console.log(err.message)
            isPending.value = false //request error
            error.value = 'Could not send a message'
        }
    }
    return { error, addDoc, isPending}
}

export default useCollection
