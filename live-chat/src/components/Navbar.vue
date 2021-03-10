<template>
  <nav v-if="user">
      <div>
          <p>Hey there {{ user.displayName }}</p>
          <p class="email">Currently login as {{ user.email }}</p>
      </div>
      <button @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import useLogout from "../composables/useLogout"
import getUser from "../composables/getUser"

export default {
    setup() {
        //logut method
        const { error, logout } = useLogout()
        //auth change monitoring
        const { user } = getUser()

        //handle logout user.karena logout method asynchronus
        const handleClick= async () => {
            await logout()
            //jika tidak terdapat error
            if(!error.value){
                console.log("user logged out")
            }
        }

        //return objek setup function
        return {handleClick, error, logout, user}
    }
}
</script>

<style>
  nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between; /* div dna button berada dikanan dan kiri */
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>