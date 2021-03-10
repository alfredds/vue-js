<template>
  <div class="login container" @submit.prevent="handleSubmit">
    <form class="card-panel">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email :</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password : </label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn grey darken-2">Login</button>
      </div>
      <p class="center sign">No Account Yet ? <span><router-link :to="{name: 'Signup'}">Signup now</router-link></span></p>
    </form>
  </div>
</template>

<script>
import { projectAuth } from '@/firebase/config'

export default {
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    handleSubmit() {
      if(this.email && this.password) {
        projectAuth.signInWithEmailAndPassword(
            this.email,
            this.password
        ).then(cred => {
            console.log(cred.user)
            this.$router.push({name: 'Home'})
        }).catch(err=> {
            console.log(err)
            this.feedback = err.message
        })
        this.feedback = null
      } else {
          this.feedback = "please fill in both fields"
      }
    }
  }
};
</script>

<style>
.login {
  max-width: 500px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
}
.login .field {
  margin-bottom: 16px;
}
.login .field > button {
  margin-bottom: 12px;
}
</style>