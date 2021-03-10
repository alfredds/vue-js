<template>
  <div class="welcome container">
    <h3>Welcome</h3>
    <div v-if="showLoginForm">
      <h2>Login to the chat room</h2>
      <!-- fungsi login merupakan emit(custom event) dr Loginform -->
      <LoginForm @login="enterChat" />
      <!-- cara paling mudah dan baik toggle form login dan sign up -->
      <p>No Account yet ? <span @click="showLoginForm = false">Signup now</span></p>
    </div>
    <div v-else>
        <h2>Sign Up to chat room</h2>
      <SignupForm @signup ="enterChat" />
      <p>Already have ? <span @click="showLoginForm = true">Login Here</span></p>
    </div>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router"

export default {
  components: { SignupForm, LoginForm },
  setup() {
    const showLoginForm = ref(true);
    const router = useRouter()

    //custom event untuk redirect/ push method ke chatroom(views). dengan fungsi router view
    const enterChat = () => {
      //yang dipush selau didalam objek
      router.push({ name: 'Chatroom' })
    }

    return { showLoginForm, enterChat };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}
/*style for form login/signup */
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #d4d4d4;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.welcome p {
    font-size: 14px;
}
.welcome span{
    font-weight: bold;
    border-bottom: 1px solid #a1a1a1 ;
    cursor: pointer;
    padding-bottom: 4px;
}
.welcome button{
    margin: 20px auto;
}

</style>