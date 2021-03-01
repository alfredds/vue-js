<template>
  <div class="form">
    <h1>Signup and Login form</h1>
    <div v-if="showLoginForm">
      <LoginForm />
      <p>
        No Account yet ? <span @click="showLoginForm = false">Signup now</span>
      </p>
    </div>
    <div v-else>
      <SignupForm />
      <p>
        Already have ? <span @click="showLoginForm = true">Login Here</span>
      </p>
    </div>
  </div>
</template>

<script>
import SignupForm from "./components/SignupForm.vue";
import LoginForm from "./components/LoginForm.vue";

export default {
  name: "App",
  data(){
    return {
      showLoginForm: true
    }
  },
  components: {
    SignupForm, LoginForm
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
body {
  margin: 0;
  color: #eee;
}
.form p{
  margin: 10 auto;
  font-size: 0.8em;
}
.form span {
  color: red;
}
</style>
