<template>
  <form @submit.prevent = 'handleSubmit'>
    <input type="email" required placeholder="Email" v-model="email" />
    <input type="password" required  placeholder="Password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from 'vue';
//external logic composition API
import useLogin from '../composables/useLogin'


export default {
    //context dapat menggantikan this(untuk emit(custom event))
    setup(props, context) {
        //refs (selalu diakhiri value)
        const email = ref('')
        const password = ref('')

        //useLogin login
        const {error, login} = useLogin()

        //submit email&password to firebase authentication
        const handleSubmit = async () => {
          //nilai login di await karena dia async
          await login(email.value, password.value)
          //jika tidak terdapat error
          if(!error.value){
            //context.emit = this.$emit di options API
            context.emit('login')
          }
        }

        //return objek const. didalam setup(composition API)
        return { email, password, handleSubmit,error}
    }
};
</script>

<style>
input {
    display: inline-block;
}
</style>