<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Song</button>
    <form v-if="showForm" @submit.prevent= "handleSubmit">
      <h4>Add a new song</h4>
      <input type="text" placeholder="Song Title" required v-model="title">
      <input type="text" placeholder="Artist" required v-model="artist">
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'
//import { v4 as uuidv4 } from 'uuid'; //generate unique id

export default {
  props: ['playlist'],
  setup(props) {
    const { updateDoc } = useDocument('playlists', props.playlist.id) //jangan lupa nama collection dan id dari collection dimasukan kedalam document
    const title = ref('')
    const artist = ref('')
    const showForm = ref(false)

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000) //generate random id sampai dengan 1 juta(floor genapkan penjumlahan(,) random nilai acak)
        //atau bisa gunakan ini(package npm i uuid )
        //id: uuidv4(),
      }
      await updateDoc({
        songs: [...props.playlist.songs, newSong] //buat item baru berdasarkan setiap array
      })
      title.value = ''
      artist.value= ''
    }

    return {title, artist, showForm, handleSubmit}
  }
}
</script>

<style>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>