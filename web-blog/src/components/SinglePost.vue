<template>
  <div class="post">
    <!-- ketika h3 diklik/ ditekan akan ke link ke file details, dengan parameter id post -->
    <router-link :to="{ name: 'Details', params: { id: post.id }}">
      <h3>{{ post.title }}</h3>
    </router-link>
    <p>{{ snippet }}</p>
    <!-- cara memanggil tag component dari db.json -->
    <span v-for="tag in post.tags" :key="tag"> 
      #{{ tag }} 
    </span>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["post"],
  setup(props) {
    const snippet = computed(() => {
      //untuk membuat potongan text details, gunakan substring untuk memecah text menjadi beberapa huruf 0-200 karakter
      return props.post.details.substring(0, 100) + "...";
    });

    return { snippet };
  },
};
</script>

<style>
.post {
  margin: 0 40px 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
}
/*styling title */
.post h3 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: white;
  margin-bottom: 10px;
  max-width: 400px;
}
/* styling background title */
.post h3::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1; /*membuat background bi belakang text */
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1deg);
}

</style>