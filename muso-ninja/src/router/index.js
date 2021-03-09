import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue";
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue";
import UserPlaylist from "../views/playlists/UserPlaylist.vue";

//auth route guard = mencegah user masuk kehalaman lain(createplaylist) jika tidak sedang login
import { projectAuth } from "../firebase/config";
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  //console.log("current user in auth guard", user);

  //jika user tidak login(belum melakukan otentikasi) redirect link ke welcome
  if (!user) {
    next({ name: "Login" });
  } else {
    next(); //jika login
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth //mencegah user masuk sebelum melakukan authentication
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/playlists/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter : requireAuth //mencegah user masuk sebelum melakukan authentication
  },
  {
    path: "/playlists/:id",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: "/playlists/user",
    name: "UserPlaylist",
    component: UserPlaylist,
    beforeEnter: requireAuth
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
