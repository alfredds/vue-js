<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <!-- menampilkan list playlist berdasarkna current user -->
    <div v-if="playlists">
      <!-- masukan props playlists kedalam list view -->
      <ListView :playlists = "playlists" />
      <!-- create new playlist button-->
      <router-link :to="{name: 'CreatePlaylist'}" class="btn">Create New Playlist</router-link>
    </div>
    
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import ListView from "@/components/ListView";

export default {
  components: { ListView },
  setup() {
    //get the current user
    const { user } = getUser();

    //membuat query untuk menampilkan playlist berdasarkan index current user
    //(argunment didalam array ['(1.property)', ('2.=='), 3.value(dalam ref) ])
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { playlists };
  },
};
</script>

<style>
</style>