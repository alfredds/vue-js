<template>
  <div class="navbar">
    <nav class="grey darken-2">
      <div class="container">
        <router-link :to="{name: 'Home'}" class="brand-logo left">Geo Location</router-link>
        <ul class="right">
          <li v-if="!user"><router-link :to="{name: 'Signup'}">Signup</router-link></li>
          <li v-if="!user"><router-link :to="{name: 'Login'}">Login</router-link></li>
          <li v-if="user"><router-link :to="{name: 'Home'}">{{ user.email }}</router-link></li>
          <li v-if="user"><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { projectAuth } from "@/firebase/config"

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    // log out user async task
    logout() {
      projectAuth.signOut().then(() => {
        this.$router.push({name: 'Login'})
      })
    }
  },
  //conditional navbar components if user login
  created() {
    projectAuth.onAuthStateChanged(user=> {
      if(user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
};
</script>

<style>
</style>