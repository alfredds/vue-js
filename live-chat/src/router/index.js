import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Chatroom from "../views/Chatroom.vue"
import { projectAuth } from "../firebase/config"

//auth route guard= mencegah user masuk kehalaman lain(chatroom) jika tidak sedang login
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard', user)

  //jika user tidak login(belum melakukan otentikasi) redirect link ke welcome
  if(!user){
    next({name: 'Welcome'})
  } else {
    next() //jika login
  }
}

//ketika user sudah login langsung diarahkan ke route(chatroom) tidak ke welcomescreen(homepage)
const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard', user)

  //jika user login(dan sudah melakukan otentikasi) redirect link ke chatroom
  if(user){
    next({name: 'Chatroom'})
  } else {
    next() //jika login
  }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: requireNoAuth //ketika user sudah login(authentication) langsung di arahkan ke chatroom
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    beforeEnter: requireAuth //mencegah user masuk sebelum melakukan authentication
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
