//fungsi ref dimport karena ada didalam ini
import { ref } from "vue";
//interaksi database dengan firebase console(config.js)
import { projectFirestore } from "../firebase/config"

//fungsi file ini digunakan untuk kompoisisi API, agar tidak menulis kode secara berulang di komponen vue
//dan file ini dimasukan kedalam setup()(component) untuk di import

//beri nama const sesuai namafile.js agar mudah dipanggil
const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  //asynchronus data dengan try and catch untuk fetch data
  const load = async () => {
    try {
      //connect database firebase. sesuaikan nama 'collection' dgn cloud firestore database. walapun collection di hapus firebase create collection dgn nama tersebut
      //gunakan fungsi await untuk get data dr database hingga pemganbilan data selesai. 
      // orderBy digunakan untuk sortir data(ascending or descending) .orderBy("namecollection","asc/desc")
      const res = await projectFirestore.collection('posts')
      .orderBy("createdAt","desc")
      .get()
      
      //gunakan map() method untuk mengambil nilai array yang baru berdasarkan nilai 'res.docs' (response.documents)
      posts.value = res.docs.map(doc => {
        //console.log(doc.data()) melihat document data
        // return value berdasarkan document objek, gunakan spread sytanx mengambil seluruh array doc, kemudian id form doc firebase
        return {...doc.data(), id: doc.id}

      })
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  //load dimasukan kedalam objek agar tidak berjalan otomatis ketika getPost dijalankan
  return { posts, error, load };
};

export default getPosts;
