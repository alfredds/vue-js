<template>
  <div class="chat-window">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="documents" class="messages" ref="messages">
        <!-- output for message -->
      <div v-for="document in formattedDocuments" :key="document.id" class="single">
        <span class="created-at"> {{ document.createdAt }}</span>
        <span class="name">{{ document.user }}</span>
        <span class="message">{{ document.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns"
import { computed, onUpdated, ref } from 'vue';

export default {
  setup() {
    const { documents, error } = getCollection("messages"); //composables components untuk menampilan chat/message

    //format date (date-fns) kemudian change name documents to this formattedDocuments
    const formattedDocuments = computed(() => {
        //check jika document tersedia/ chat dengan fungsi map
        if (documents.value) {
            return documents.value.map(document => {
                let time = formatDistanceToNow(document.createdAt.toDate())
                //timpa format date sebelumnya dengan createdAt: time berdasarkan nilai map
                return {...document, createdAt: time}
            })
        }
    })

    //auto-scroll to bottom of messages
    const messages = ref(null)

    //ketika element di updated atau diperbaharui
    //element scrolltop merupakan nilai awal dari scroll element 0(titik awal) ke scrollheight =tinggi minimun(kebawah element) dari element
    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight
    })  

    return { documents, error, formattedDocuments, messages };
  },
};
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
  }
.created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
}
.name{ 
    font-weight: bold;
    margin-right: 6px;
}
.messages {
    max-height: 400px;
    overflow: auto;
}
</style>