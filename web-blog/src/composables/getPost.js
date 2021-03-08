//file ini digunakan untuk setup didalam detail post
import { ref } from "vue"; 
import { projectFirestore } from "../firebase/config";

//buat fungsi sesuaikan nama file, karena tidak ada id sebagai parameter masukan kedalam functuion const
const getPost = (id) => {
     //objek array ada didalam json/db.json, parameter id maka nilainya null
  const post = ref(null);

  //ketika tidak ada data valueref = null
  const error = ref(null);

  //asynchronus data dengan try and catch untuk fetch data
  const load = async () => {
    try {
      //ambil data single post dr firebase database collection dgn document kemduian get method, walapun collection di hapus firebase create collectin dgn nama tersebut
      // dengan doc(id) atau parameter document id 
      let res = await projectFirestore.collection('posts').doc(id).get()
      //console.log(res.data()) untuk melihat single data

      //ketika data error/tidak ada(check di res.data()) ada atau tidak data existnya
      if(!res.exists){
        throw Error('That Post do not exist')
      }

      //ambil data post dari id nya dengan spread syntax menggunakan object literal, 
      //dengan response id nya
      post.value = {...res.data(), id: res.id}
      //console.log(post.value) cek value data

    } catch (err) {
      //constanta error(dengan ref selalu dengan .value) = objekcatch.message(throwmessage)
      error.value = err.message;
      //cetak error(ref)
      console.log(error.value);
    }
  };


  //fungsi return ini berfungsi untuk ketika getPost dipanggil dlm komponen, objek dapat mengembalikan nilainya kedalam komponen yg digunakan
  //load dimasukan kedalam objek agar tidak berjalan otomatis ketika getPost dijalankan 
  return {post, error, load}
}

export default getPost