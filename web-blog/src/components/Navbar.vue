<template>
  <!-- ingat untuk navbar sluruhnya didalam header -->
  <header>
    <h1>News Blog</h1>
    <nav>
      <!-- routerlink digunakan untuk hyperlink ke kompenen lain -->
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Create' }">Create Post</router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
header {
  display: flex;  /*item/konten menjadi sejajar */
  justify-content: space-between; /* membuat kontent text/img berada dikanan dn kiri */
  align-items: center; /*membuat posisi item kanan dn kiri sejajar */
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
header h1 {
  color: #202;
  font-size: 42px;
}
header a {
  color: #666;
  text-decoration: none;
  margin-left: 20px;
}
header a.router-link-active {
  color: #444;
  font-weight: bold;
}
</style>