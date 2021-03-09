<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/doge.png" />
      <h1><router-link :to="{ name: 'Home' }"> Song Playlist </router-link></h1>
      <div class="links">
        <!-- jika user ada nilainya tombol logout muncul dan signup dan login(hide) -->
        <div v-if="user">
          <router-link class="btn" :to="{ name: 'CreatePlaylist' }">Create PlayList</router-link>
          <router-link class="btn" :to="{ name: 'UserPlaylist' }">My PlayList</router-link>
          <span>Hi.. Here, {{ user.displayName }} | email : {{ user.email }}</span>
          <button @click="handleSubmit">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, logout, isPending } = useLogout();
    const router = useRouter();
    const { user } = getUser();

    const handleSubmit = async () => {
      await logout();
      console.log("user log out");
      router.push({ name: "Login" });
    };

    return { error, isPending, handleSubmit, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto; /* membuat child didalam parent(nav) berada di kanan layar */
}
nav .links a,
button {
  margin-left: 12px;
  font-size: 14px;
}
nav img {
  max-height: 60px;
  max-width: 60px;
  border-radius: 50%;
  border: 2px solid #dfdfdf;
}
span {
  font-size: 12px;
  display: inline-block;
  margin-left: 5px;
  padding-left: 16px;
}
</style>