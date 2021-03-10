<template>
  <div v-if="job">
    <!-- fungsi v-if disini untuk bisa mengambil nilai title. karena nilai job bernilai null(false) agar kondisi nya menjadi true ketika di fetcg -->
      <!-- ketika value didalam http://localhost:8080/jobs/'whateverthis' nilainya akan tetap sama 
     dan akan selau mengarah kesini karena fungsi $router karena didalam index.js paramaternya dibuat path: /jobs/:id
-->
  <h1>Job Details Page(belajar parameter routing dan fetching data)</h1>
  <h2>{{ job.title }}</h2>
  <!-- gunakan fungsi $route untuk mengambil data yang ada parameter (untuk parameter nya saat ini digunakan :id) 
       apapun nilai parameter di path yang digunakan (itu menjadi params di route components (e.g : /path/:value))
       fungsi id($route.params.id) ini dapat dibuat di component data 
  -->
  <p>The job id is: {{ job.id }}</p>
  <p>The job detail: {{ job.detail }}</p>
  </div>
</template>

<script>
export default {
  //fungsi props ini dpat digunakan digunakan untuk paramater :id karena sudah dideklarasikan didalam router index.js(props: true)(props dalam bentuk string)
  props: ["id"],

  //untuk stored data yang di mounted.data yang dimounted wajib di store didalam data
  data() {
    return {
      //job ini objek javascript untuk menangani error
      job: null, //nilai null setara/sama dengan false/no
    };
  },

  //gunakan mounted untuk fetching data. (ketika penulisan (coma seperti berikut "http://localhost:3000/jobs/", + this.id))
  // menyebabkan error 'Window': cannot convert to dictionary.
  mounted() {
    //fetch ini mengambil request untuk id setiap array json
    fetch("http://localhost:3000/jobs/" + this.id)
      //ketika request respon dr json
      .then((res) => res.json())

      //ketika mengambil data array id setiap job(bukan jobs) yang ada dalam json
      .then((data) => (this.job = data))

      //ketika kemungkinan error request json(error.massage)
      .catch((error) => console.log(error.message));
  },

  //component data() dbawah ini dapat digantikan dengan props dengan membuat paramater props:true didalam index.js(ketika paramater dibuat di job.vue)
  // data() {
  //   return {
  //     //penggunaan penaamaan route parameter untuk di template
  //     id : this.$route.params.id
  //   }
  // }
};
</script>

<style>
</style>