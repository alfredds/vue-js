import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import Jobs from '../views/jobs/Job.vue'
import JobDetails from '../views/jobs/JobDetails'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    //lazy loading router(drpada menggunakan pendeclarean components seperti lainnya, cara component ini lebih meringankan beban loading webpage)
    //jadi tidak perlu di import untuk componentnya diatas. gunakan seperti function component dibawah ini
    component: () => import('../views/About.vue') //cara ini membuat javascript hanya meload page ini ketika user direct ke page ini
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  },
  {
    path: '/jobs/:id', /* colon :id(digunakan sebagai parameter routing untuk setiap komponen didalam folder job) */
    name: 'JobDetails',
    component: JobDetails,
    props: true /* properti ini dapat menerima paramater path sebagai props(untuk menggantikan komponen data()) untuk path (parameter :id) */
  },
  //redirect path jobs secara instal(langsung ke Job.vue) menggunakan 'redirect'(ketika di buat linknya http://localhost:8080/all-jobs-> langsung ke job.vue)
  {
    path: '/all-jobs',
    redirect: '/jobs',
  },
  // catch: menangani pesan error ketika link yang dituju tidak ada/ditemukan(pakai catchAll : '/:catchAll(.*))
  {
    path : '/:catchAll(.*)', /*gunakan metode path ini jika halaman yang dicari tidak ditemukan */
    name: 'NotFound',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
