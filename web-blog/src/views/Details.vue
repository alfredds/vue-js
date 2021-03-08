<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.details }}</p>
    <button @click="handleDelete" class="delete">delete post</button>
  </div>
  <div v-else>
    <Spinner />
    </div>
</template>

<script>
import getPost from "../composables/getPost";
//preloader
import Spinner from "../components/Spinner";
import {useRoute, useRouter} from "vue-router"
import { projectFirestore } from '../firebase/config';

export default {
  props: ["id"],
  //memanggil id dengan setup(props)
  components: {Spinner},
  setup(props) {
    //useRoute digunakan untuk menggantikan props parameter didalam setup
    //untuk mengatasi parameter yang lebih dr 1, untuk melihat method dgn console.log(route)
    const route = useRoute()
    //untuk direct method ke views object(sperti option API $this.router)
    const router = useRouter()

    //parameter di getPost diberikan id karena itu berikan nilainya
    const { post, error, load } = getPost(route.params.id);

    //load function untuk post data
    load();

    //handleDelete untuk delete post, gunakan asynchronus karena handle data asynchronus task
    const handleDelete = async () => {
      //tidak perlu di return karena tidak ada data yang di kembalikan
      //target document id berdasarkan props id(karena didalam router props: true)
      await projectFirestore.collection('posts')
      .doc(props.id)
      .delete()

      //direct ke homepage ketika selesai di delete
      router.push({name: 'Home'})
    }


    //masukan object di dalam setup, kedalam ini
    return { post, error, handleDelete };
  },
};
</script>

<style scoped>
.post {
    max-width: 1200px;
    margin: 0 auto;
}
.post p{
    color: #444;
    line-height: 1.5em;
    margin-top: 30px;
}
.pre {
    white-space: pre-wrap; /*rata tengah */
}
button.delete {
  margin: 10px auto;
}
</style>