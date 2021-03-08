<template>
  <div class="home">
    <div v-if="error">{{ error }}</div>
    <!-- ketika seluruh data sedang diresponse gunakan v-if value.length didalam div berdasarkan objek ref[array]-->
    <div v-if="posts.length" class="layout">
      <Posts :posts="posts" />
      <!-- karena kita butuh nilai post didalam 'tagcloud' maka masukan posts 
      binding ke dalam fungsi posts, dan tidak perlu lagi membuat posts binding didalam tagcloud -->
      <TagCloud :posts="posts" />
    </div>
    <!-- ketika data masih response dari selurh post -->
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import Posts from "../components/Posts.vue";
//import file setup() function, untuk mengorganisasi logic dengan lebih baik
import getPosts from "../composables/getPosts";
//preloader
import Spinner from "../components/Spinner.vue";
//sortir tag Post
import TagCloud from "../components/TagCloud.vue";

export default {
  name: "Home",
  components: { Posts, Spinner, TagCloud },
  //fungsi compostion API(setup()) kita bisa mengeksternalisasi semua logika ini ke dalam fungsi terpisah di filenya sendiri, sehingga kita hanya perlu meng import nya ke berkas lain(components lain)
  //didalam setup fungsi this, $ cant use
  setup() {
    //masukan objek yang dibutuhkan kedalam fungsijs, sesuai return objek yang dibuat
    const { posts, error, load } = getPosts();

    //fungsi load untuk load data asynchronus try and catch didalam getPosts.js
    load();

    // masukan object di dalam setup, kedalam ini
    return { posts, error };
  },
};
</script>

<style>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
/* gunakan grid untuk display layout post and tag */
.layout {
  display: grid;
  gap: 15px;
  grid-template-columns: 3fr 1fr;
}
</style>