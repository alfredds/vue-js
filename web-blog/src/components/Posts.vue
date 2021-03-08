<template>
  <!-- post didalam list kalau tidak berantakan post akan loncat 1,3,5 dah strusnya-->
  <div class="post-list">
    <!-- gunakan v-for untuk menampilkan data dr array objek Home.vue -->
    <div v-for="post in posts" :key="post.id">
      <!-- passing singlepost dengan method import, binding post -->
      <SinglePost :post="post" />
    </div>
  </div>
</template>

<script>
import SinglePost from "../components/SinglePost.vue";

export default {
  props: ["posts"],
  //cara mengggunakan props didalam setup(props){props.value}
  components: { SinglePost },
  setup() {},
};
</script>

<style>
</style>