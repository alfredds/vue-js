<template>
  <div id="nav">
    <!-- fungsi router-link hampir sama dengan anchor ("a") tapi mempunyai fungsi yang lebih baik dalam request data 
         karena mengambil data dari server cukup mengganti komponennya drpada selalu meminta(request) ke server
         dan style hanya aktif pada tab sehingga tidak ada beban network
    -->
    <router-link to="/">Home</router-link> |
    <!-- keuntungan lainnya memakai router link ketika nama file path atau path berubah 
      kita tidak perlu menulis berulang ulang cukup tulis nama componentsnya saja 
      karena components nama sesuai index.js tidak perlu menganti setiap saat link nya karena hal itu fungsinya sama 
    -->
    <router-link :to="{ name: 'About' }">About</router-link> |
    <router-link :to="{ name: 'Jobs' }">Jobs</router-link> |
  </div>

  <!-- programmatic navigations(untuk redirect,forward and backward) navigasi user -->
  <button @click="redirect">Redirect</button>
  <button @click="back">Go Back</button>
  <button @click="forward">Go Forward</button>

  <!-- router view digunakan untuk menampilkan setiap komponen di folder view -->
  <router-view />
</template>

<script>
export default {
  //membuat methods untuk event klik redirect,back,forward
  //dalam penggunaan navigasi programmatic gunakan $router bukan $route
  methods: {
    //penggunaan redirect langsung mengarah ke komponen/path yang ingin dituju dengan push({name: 'pathName'})
    redirect() {
      this.$router.push({name: 'Home'})
    },
    //penggunaan minus(-) didalam go(pergi ke). untuk mengetahui berapa langkah history navigasi dilakukan(dikurang 1) 
    back() {
      this.$router.go(-1) /* minus(-) digunakan untuk kembali kehistory sebelumnya */
    },
    forward() {
      this.$router.go(1) /* plus (+/or just number) digunakan untuk kembali kehistory setelahnya*/
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 10px;
}

#nav a.router-link-exact-active {
  color: white;
  background: crimson;
}

button {
  margin: 0 10px; /*untuk button sebaiknya penulisan seperti ini margin nya */
  padding: 10px;
  border: none;
  border-radius: 5px;
}
</style>
