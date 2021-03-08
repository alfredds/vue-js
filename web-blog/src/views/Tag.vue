<template>
  <div class="tag">
      <!-- ketika error tampilkan error message -->
      <div v-if="error">{{error}}</div>
      <!-- post.length digunakan karena 'ref value'(di getPost.composable) bernilai empty string awalnya, 
      jadi yang hanya ditampilkan yang mempunyai nilai array -->
      <div v-if="posts.length" class="layout">
        <!-- tampilkan Post List yang ada didalam ini, berdasarkan nilai tag -->
        <Posts :posts="postWithTag" />
        <!-- output Taglist, karena ada props di tag cloud binding data nya -->
        <TagCloud :posts="posts"/>
      </div>
      <!-- jika data tidak muncul tampilkan spinner -->
      <div v-else>
          <Spinner />
      </div>
  </div>
</template>

<script>
import getPosts from "../composables/getPosts"
import Posts from "../components/Posts.vue"
import TagCloud from "../components/TagCloud.vue"
import Spinner from "../components/Spinner.vue"
import {useRoute} from "vue-router"
import { computed } from 'vue'

export default {
    components: {Posts, TagCloud, Spinner},
    setup() {
        const route = useRoute()
        const {posts,load,error} = getPosts()
    
        //load digunakan agar post tidak berjalan otomatis
        load()

        //mengembalikan nilai tag untuk setiap post yang ada, gunakan fungsi computed
        const postWithTag = computed(() => {
            //posts menggunakan fungsi ref jadi selalu diakhiri value(cek di getPosts(composables))
            //gunakan fungsi filter untuk mensortir sesuai post. berdasarkan seluruh posts
            //includes digunakan ketika post yang sesuai dengan tag akan ditampilkan, dan yang tidak, akan bernilai false(tidak dimunculkan)
            //yang bernilai false akan filter out from array
            return posts.value.filter((post)=> post.tags.includes(route.params.tag))
        })

        // return value objek ref
        return {posts, error, postWithTag}
    }
}
</script>

<style>
  .tag {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
</style>