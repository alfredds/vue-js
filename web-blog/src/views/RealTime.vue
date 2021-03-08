<template>
  <h1>Real-time Listener</h1>
  <div v-for="post in posts" :key="post.id">
    <div>
      {{ post.title }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
export default {
  //realtime update create post
  setup() {
    const posts = ref([]);

    //get data from firebase,and sortir ascending by date created
    //onSnapshot digunakan untuk setup data secara real-time ke firestore collection(database), data secara langsung ditampilkan tnp refresh page
    //map digunakan untuk memeperoleh data array baru(map menggunakan fungsi callback) berdasarkan seluruh document
    projectFirestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let docs = snap.docs.map((doc) => {
          //return objek seluruh document data, dengan spread syntax, kemudian ambil document berdasarkan id nya(firebase)
          return { ...doc.data(), id: doc.id };
        });
        console.log("Document : ", docs); //melihat document array dalam docs
        //masukan document(docs) value kedalam const posts ref
        posts.value = docs;
      });
    return { posts };
  },
};
</script>

<style>
</style>