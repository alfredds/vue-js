<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign Up</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="email" placeholder="Email" class="email" v-model="email" />
    <input
      type="password"
      placeholder="Password"
      class="password"
      v-model="password"
    />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <!-- pending request ketika masih loading request -->
    <button v-if="isPending" disabled>loading..</button>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    //import method sesuai dengan yang ada di useSignup
    const { error, signup, isPending } = useSignup();

    const email = ref("");
    const password = ref("");
    const displayName = ref('')
    const router = useRouter()

    const handleSubmit = async () => {
        await signup(email.value, password.value, displayName.value)

        //jika user berhasil sign up
        if(!error.value) {
            console.log("user signed up")
            router.push({name: 'UserPlaylist'})
        }
    }

    return { email,password, displayName, error, isPending, handleSubmit };
  },
};
</script>

<style>
</style>