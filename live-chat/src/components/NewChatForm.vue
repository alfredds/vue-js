<template>
  <form>
    <textarea
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div class="error">
        {{ error }}
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
import { timestamp } from "../firebase/config";
import useCollection from '../composables/useCollection';

export default {
  setup() {
    const { user } = getUser();
    const {addDoc, error} = useCollection('messages') //component dpt direusable untuk dokemntasi chat/message

    const message = ref("");

    //fungsi ini jadi asynchronus karena nanti nya membuat query ke database. seluruh chat di simpan ke dalam firebase
    const handleSubmit = async () => {
      const chat = {
        user: user.value.displayName, //user yang mengirim pesan
        message: message.value, //isi pesan yg dikirim
        createdAt: timestamp(), //waktu pesan dikirim ketika dibuat
      };

      //dokumentasi chat
      await addDoc(chat)
      if(!error.value) {
      message.value = ""; //kosongkan chat ketika di kirim
      }
    };

    return { message, handleSubmit, error };
  },
};
</script>

<style scoped>
/* agar style form tidak bertabrakan gunakan scoped */
form {
  margin: 10px;
}
textarea {
  padding: 10px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border: 0;
  margin-bottom: 6px;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
</style>
