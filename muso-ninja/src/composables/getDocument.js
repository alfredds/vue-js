//getting realtime listener for (document) Playlist details seperti getcollection

import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config' //untuk interaksi project dengan database(setup connection to firestore)

//nama collection = nama 'collection' digunakan function ini agar dapat resuable, dan aplikasi bekerja dengan baik
const getDocument = (collection, id) => {

    const document = ref(null)
    const error = ref(null) //error ini didalam fungsi agar tidak bertabrakan dengan error global variabel

    //get single document
    const documentRef = projectFirestore.collection(collection).doc(id)

    //realtime listener(fungsi const unsub membatasi listener(e.g login, logout, written data) berjalan)
    //fungsi ini untuk di stored message/doc didalam variabel ketika ada perubahan data(snap). fungsi snap seperti menggantikan async await
    const unsub = documentRef.onSnapshot((doc) => {
        //fungsi ini jika id berubah /didnt exist halaman tidak ditampilkan
        if(doc.data()) {
            document.value = {...doc.data(),  id: doc.id} //pass document id
            
            //ketika tidak ada error di code or auth
            error.value = null 
        } else {
            error.value = 'that document doesnt exist'
        }
        
    }, err => {
        //ketika ada error di code, documents or auth
        console.log(err.message)
        error.value  = 'could not fetch document'
    })

    //unsubcribe from real time listener(membatasi operasi expensive bisa dijalankan(onSnapshot))
    //mengurangi snapshot dijalankan sebanyak 1 (jadi hanya 1 dijalankan dilocal dan 1 server), 
    watchEffect((onInValidate) => {
        //unsub from previous collection when watcher is stopped(components unmounted)
        onInValidate(()=> unsub())
    })

    return {document, error}
}

export default getDocument
