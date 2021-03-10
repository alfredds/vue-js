import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from '@/firebase/config'

Vue.config.productionTip = false

let app

// wait for firebase auth to initialize  before creating the app(ketika user login dan logout tidak bernilai null ketika fetching data)
projectAuth.onAuthStateChanged(() => {
  
  //init app if not already created(still rendering) agar ketika app berjalan tidak perlu di reload
  if(!app){
    //wrapping the vue instance
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})



