<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="handleSubmit()">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email :</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password : </label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias : </label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn grey darken-2">Sign up</button>
      </div>
      <p class="center sign">Already Have Account ? <span><router-link :to="{name: 'Login'}">Login now</router-link></span></p>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import { projectFirestore, projectAuth } from "@/firebase/config.js";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: "",
      feedback: null,
      slug: ""
    };
  },
  methods: {
    //slugify the alias for auth user without auto-id
    handleSubmit() {
      //field cant empty
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        //get the user from firestore cloud
        let ref = projectFirestore.collection("users").doc(this.slug);
        ref.get().then(doc => {
          //jika doc(alias) already exists
          if (doc.exists) {
            this.feedback = "this alias already exists";
          } else {
            projectAuth
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                //set properti for recording credential user properties
                ref.set({
                    alias: this.alias,
                    geolocation: null,
                    user_id: cred.user.uid
                }).then(() => {
                    //redirect to homepage
                    this.$router.push({name: 'Home'})
                })
              })
              .catch(err => {
                console.log(err);
                this.feedback = err.message;
              });
          }
        });
        console.log(this.slug);
      } else {
        this.feedback = "You must enter all field";
      }
    }
  }
};
</script>

<style>
.signup {
  max-width: 500px;
  margin-top: 60px;
}
.signup h2 {
  margin-top: 10px;
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 12px;
}
.signup .field > button {
  margin-bottom: 12px;
}
</style>