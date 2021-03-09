<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input 
    type="email" placeholder="Email" 
    class="email" 
    v-model="email" />
    <input
      type="password"
      placeholder="Password"
      class="password"
      v-model="password"
    />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <!-- pending request ketika masih loading request -->
    <button v-if="isPending" disabled>Loading..</button>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter()

    const { login, error, isPending } = useLogin();

    //sesuai dengan function yang ada di useLogin
    const handleSubmit = async () => {
       const res = await login(email.value, password.value)

       //jika tidak ada error
       if(!error.value) {
           console.log('user logged in')
           router.push({name: 'UserPlaylist'})
       }
    }

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style>
</style>