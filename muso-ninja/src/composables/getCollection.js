//untuk menampilkan data chat yang dikirim ke database cloud firestore
import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config' //untuk interaksi project dengan database(setup connection to firestore)

//nama collection = nama 'collection' digunakan function ini agar dapat resuable, dan aplikasi bekerja dengan baik
const getCollection = (collection, query) => {

    const documents = ref(null)
    const error = ref(null) //error ini didalam fungsi agar tidak bertabrakan dengan error global variabel

    let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt') //chat yg terkirim disusun berdasarkan timestamp

    //fungsi if ini untuk memberi tahunkan jika ada query didalam user[untuk playlist berdasarkan current user]
    if(query) {
        collectionRef = collectionRef.where(...query)
    } 

    //realtime listener(fungsi const unsub membatasi listener(e.g login, logout, written data) berjalan)
    //fungsi ini untuk di stored message/doc didalam variabel ketika ada perubahan data(snap). fungsi snap seperti menggantikan async await
    const unsub = collectionRef.onSnapshot((snap) => {
        console.log('snapshot') //cek berapa kali snapshot ini dijalankan
        let results = []

        //masukan data documents snap(setiap ada change) kedalam result(setiap array) melalui objek document(...doc(spread syntax)), id dan createdAt kedalam firestore cloud
        snap.docs.forEach(doc => {
            //real time data server
            //document created At dan object result ini agar hasil kirim tercetak juga di server firebase bukan hanya dilocal server(cara ini sesuai firebase behaviour)
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        //cetak result kedalam documents
        documents.value = results
        //ketika tidak ada error di code or auth
        error.value = null
    }, err => {
        //ketika ada error di code, documents or auth
        console.log(err.message)
        documents.value = null
        error.value  = 'could not fetch data'
    })

    //unsubcribe from real time listener(membatasi operasi expensive bisa dijalankan(onSnapshot))
    //mengurangi snapshot dijalankan sebanyak 1 (jadi hanya 1 dijalankan dilocal dan 1 server), 
    watchEffect((onInValidate) => {
        //unsub from previous collection when watcher is stopped(components unmounted)
        onInValidate(()=> unsub())
    })

    return {documents, error}
}

export default getCollection