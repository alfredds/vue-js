<template>
  <div class="container">
    <Navbar />
    <ChatWindow />
    <NewChatForm />
  </div>
</template>

<script>
import { watch } from 'vue';
import Navbar from "../components/Navbar.vue";
import NewChatForm from "../components/NewChatForm.vue";
import ChatWindow from "../components/ChatWindow.vue";
import getUser from "../composables/getUser"
import { useRouter } from 'vue-router';

export default {
  components: { Navbar, NewChatForm, ChatWindow },
  //watching the current user
  setup() {
    const { user } = getUser()
    const router = useRouter()

    //fungsi ini ketka tombol logout di klik otomatis redirect ke homepage. watch digunakan ketika ada perubahan data didalamnya
    watch(user, () => {
      //jika user sudah tidak login atau melakukan auth kembalikan halaman ke welcome screen
      if(!user.value){
        router.push({name: 'Welcome'})
      }
    })
  }
};
</script>

<style>
</style>