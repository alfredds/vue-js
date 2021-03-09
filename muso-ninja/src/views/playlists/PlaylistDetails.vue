<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div class="playlist-details" v-if="playlist">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button @click="handleDelete" v-if="ownership">Delete Playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <!-- !playlist.songs.length jika tidak ada item di array tampilkan taxt ini -->
      <div v-if="!playlist.songs.length">No Songs have been added to this playlist yet.</div>
      <!-- tampilkan lagu dalam array playlist songs -->
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <!-- handle click song berdasarkan key playlist song -->
        <button v-if="ownership" @click.prevent="handleClick(song.id)">delete</button>
      </div>
      <!-- agar bisa using props playlist di AddSong.vue -->
      <AddSong v-if="ownership" :playlist="playlist"/> 
    </div>
  </div>
</template>

<script>
import AddSong from "@/components/AddSong"
import useStorage from "@/composables/useStorage";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["id"], //berdasarkan route paramater playlistdetails(index.js)
  components: { AddSong },
  setup(props) {
    //change name document:(with playlist)
    const { document: playlist, error } = getDocument("playlists", props.id);
    const { user } = getUser();
    const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
    const { deleteImage } = useStorage();
    const router = useRouter();

    //checking playlist ownership
    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    //handle delete method
    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push({name: 'Home'})
    };

    //handle delete for single song(playlist = ref ingat value) 
    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id != id)
      //kemdian update data array yg difilter (const songs)
      await updateDoc({ songs })
    }

    return { playlist, error, ownership, handleDelete, handleClick };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 150%;
  max-height: 150%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>