<template>
  <!-- menampilkan tag post yang ada -->
  <div class="tag-cloud">
      <h3>Tags</h3>
      <div v-for="tag in tags" :key="tag">
          <!-- output ini juga link ke dalam post nya ketika tag ditekan, dgn params tag sesuai router(index.js) -->
          <router-link :to="{name: 'Tag', params:{tag : tag}}">
              <!-- output dari seluruh post tag masuk kesini, berdasarkan params tag router-link -->
              #{{tag}}
          </router-link>
      </div>
  </div>
</template>

<script>
//import logic nilai tags
import useTags from "../composables/useTags"

export default {
    //masukan props posts agar mendapat nilai setiap post
    props:['posts'],
    setup(props){
        //masukan props params didalam useTags(posts) untuk mengambil nilai tags didalam array
        const {tags} = useTags(props.posts)

        return {tags}
    }
}
</script>

<style>
.tag-cloud {
    padding: 10px;
}
.tag-cloud h3{
    border-bottom: 1px solid #eee;
    padding: 16px 8px;
    color: #444;
}
.tag-cloud div {
    display: inline-block;
    padding: 10px;
}
.tag-cloud a {
    color: #cacaca;
    text-decoration: none;
}
.tag-cloud a.router-link-active{
    color: #ff8800;
    font-weight: bold;
}
</style>