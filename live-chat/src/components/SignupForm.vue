<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="Display Name"
      v-model="displayName"
    />
    <input type="email" required placeholder="Email" v-model="email" />
    <input type="password" required placeholder="Password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";

export default {
  //context dapat menggantikan this(untuk emit(custom event))
  setup(props, context) {
    //refs (selalu diakhiri value)
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    //external logic for signup
    const { error, signup } = useSignup();

    //submit form signup to firebase collection(database)
    const handleSubmit = async () => {
      //karena method sign up nya asynchronus, gunakan async await
      await signup(email.value, password.value, displayName.value);
      //jika tidak terdapat error
      if (!error.value) {
        //context.emit = this.$emit di options API(custom event)
        context.emit("signup");
      }
    };

    //return objek const. didalam setup(composition API)
    return { displayName, email, password, handleSubmit, error };
  },
};
</script>

<style>
</style>