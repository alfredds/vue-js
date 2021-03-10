<template>
  <h1>Jobs</h1>
  <!-- jika tidak menggunakan v-if data yang diambil jika array nya banyak menyebabkan error/lag, 
  maka sebaiknya menggunakan v-if dan v-else sehigga permintaan data array sampai data muncul baru sukses 
  job.length untuk membuat seluruh data array nya muncul dahulu kemudian pesan else disembunyikan
  -->
  <div v-if="jobs.length">
    <p>(belajar folder struktur dan routing method vue and fetch data)</p>
    <!-- v-for selalu harus ada key yang di binding -->
    <div v-for="job in jobs" :key="job.id" class="job">
      <!-- data yang ada didalam router-link dibuat dinamis(dibinding(:to={pathnamevalue(name), paramater value(params)})) untuk mengambil paramater JobDetails.vue 
         kemduian data nya dibuat parameter penunjuk nya berdasarkan nama objek pada array jobs(nama disini job paramater yang di ambil id)
         penulisan properti parameter(params: { param(id) : namaobject(job).paramobjek(misal:id,title,detail)) }
    -->
      <router-link :to="{ name: 'JobDetails', params: { id: job.id } }">
        <h2>{{ job.title }}</h2>
      </router-link>
    </div>
  </div>
  <div v-else>
    <p>Loading all job...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
    };
  },
  //gunakan mounted untuk fetching data(dr db.json)(liat lifecylce hooks klu confuse)
  mounted() {
    //fetch ini asynchronus dan dia mengembalikan promise
    fetch("http://localhost:3000/jobs/")
      //ketika request respon dr json
      .then((response) => response.json())

      //ketika mengambil data array yang ada dalam json
      .then((data) => (this.jobs = data))

      //ketika kemungkinan error request json(error.massage)
      .catch((error) => console.log(error.message));
  },
};
</script>

<style>
.job h2 {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  margin: 10px auto;
  max-width: 500px;
  cursor: pointer;
  color: #444;
}
/* ketika mouse diarahkan ke attribut classnya  */
.job h2:hover {
  background: #dddddd;
}
.job a {
  text-decoration: none;
}
</style>