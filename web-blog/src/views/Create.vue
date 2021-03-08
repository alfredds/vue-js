<template>
  <!-- membuat web-form -->
  <div class="create">
    <!-- mencegah web reload ketika tombol disubmit -->
    <form @submit.prevent="handleSubmit">
      <label>Title :</label>
      <input v-model="title" type="text" required />

      <label>Details :</label>
      <textarea v-model="details" required></textarea>
      <!-- keydown.enter.prevent mencegah tombol enter submit ketika enter ditekan -->
      <label>Tags: (tekan enter)</label>
      <input v-model="tag" type="text" @keydown.enter.prevent="handleKeydown" />
      <!-- output dr tag variabel -->
      <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
      <button>Add Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
//import createPost from "../composables/createPost"
//cara menggunakan fungsi router, import package vue router dengan cara berikut(karena tidk dpt mengunnakna this.$route in composition API)
import { useRouter } from "vue-router";
import { projectFirestore, timestamp } from '../firebase/config';

export default {
  setup() {
    const title = ref("");
    const details = ref("");
    const tag = ref("");
    const tags = ref([]); //memasukan tag kedalam tags
    const error = ref(null);

    // fungsi ini untuk mengembalikan nilai router dr useRouter, dan untuk push method kedalam Posts.vue/home
    //fungsi useRouter() = $router dlm Option API
    const router = useRouter();

    const handleKeydown = () => {
      //ketika tag name bernilai sama gunakan includes sehingga tidak dobel name/output
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g, ""); //removes all whitespace(spasi)(/\s/, ''=merupakan regular expresion)
        //masukan output tag kedalam tags dengan push method
        tags.value.push(tag.value);
      }
      // kemudian clear form input dengan ini
      tag.value = "";
    };

    //handleSubmit button untuk method POST
    const handleSubmit = async () => {
      //value ref json objek
      //fungsi 'createdAt(timestamp())' setiap document baru yang dibuat akan disimpan dalam firebase(cloud firestore)
      const post = {
        title: title.value,
        details: details.value,
        tags: tags.value,
        createdAt: timestamp()
      };
      //create post to firebase database, gunakan method add untuk menambah document kedalam posts collection
      const res = await projectFirestore.collection('posts').add(post)
      //console.log(res) // can see the id and path of doc created

      //name harus didalam objek. push objek ke home dgn vue-router
      router.push({ name: "Home" });
    };

    //ingat ref selalu di akhiri value
    return { title, details, tag, handleKeydown, tags, error, handleSubmit };
  },
};
</script>

<style>
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #d1d0d0;
}
textarea {
  height: 160px;
}
label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
}
/* style background color and position label ::before fungsi nya untuk injeksi content sebelum DOM objek */
label::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 50px;
  left: -30px;
  transform: rotateZ(-1.5deg);
}
button {
  display: block;
  margin-top: 30px;
  background: #ff8800;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
  border-radius: 5px;
  transform: translate(150%, 5%);
}
/* untuk memberi background dan posisi pada tags output */
.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 7px;
  border-radius: 15px;
  font-size: 14px;
}
</style>