import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/auth/Signup.vue'
import Login from '../views/auth/Login.vue'
import UserProfile from '../views/UserProfile.vue'
import { projectAuth } from '../firebase/config'

Vue.use(VueRouter)

//route guard
const requireAuth = (to,from,next) => {
  let user = projectAuth.currentUser;

  //if user not login
  if(!user) {
    next({name: 'Login'})
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile/:alias', //this alias(id) in collection firestore
    name: 'UserProfile',
    component: UserProfile,
    beforeEnter: requireAuth
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
