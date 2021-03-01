<template>
  <!-- form login(create account).prevent mencegah form ketika button submit reload page -->
  <form @submit.prevent="handleSubmit">
    <h2>Login Form</h2>
    <!-- email. . v-model untuk menunjuk data binding 2 arah:template & data -->
    <label>Email :</label>
    <input type="email" required v-model="email" placeholder="email" />

    <!-- password -->
    <label>Password :</label>
    <input
      type="password"
      required
      v-model="password"
      autocomplete="on"
      placeholder="password"
    />
    <div class="errorMsg" v-if="passwordError">{{ passwordError }}</div>

    <!-- button -->
    <div class="submit">
      <button>Login Now</button>
    </div>
    <div class="button1">
      <button @click.prevent>Login with: <i class="fa fa-google-plus-square" id="google"></i></button>
      <button @click.prevent>Login with: <i class="fa fa-facebook-square" id="facebook"></i></button>
    </div>
  </form>
</template>

<script>
export default {
  //data objek nya selalu di return
  data() {
    return {
      email: "",
      password: "",
      role: "developer",
      skills: [],
      tempSkill: "",
      terms: false,
      passwordError: "",
    };
  },
  methods: {
    handleSubmit() {
      //password validation panjang character > 5
      this.passwordError =
        this.password.length > 5
          ? ""
          : "Password harus lebih panjang dari 6 karakter";

      //ketika passowrd tidak error dan output dimasukan dalam console
      if (!this.passwordError) {
        console.log("email :", this.email);
        console.log("password :", this.password);
      }
    },
  },
};
</script>

<style scoped>
form {
  max-width: 420px;
  margin: 0px auto;
  background: white;
  text-align: left;
  padding: 5px;
  border-radius: 10px;
}
form h2 {
  margin-bottom: 12px;
  margin-top: 0px;
  text-align: center;
}
label {
  color: rgb(2, 2, 15);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block; /* membuat style bedasarkan attr. agar properti nya pindah baris */
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  color: #555;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  /* untuk shadow diluar box. x=horizontal y=vertikal z=blur shadow.
  gunakan inset jika ingin didalam */
}

button {
  background: #0b6dff;
  border: 0;
  margin-top: 30px;
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
}
.submit {
  text-align: center;
}
.errorMsg {
  color: red;
  margin-top: 10px;
  font-size: 0.7em;
  font-weight: bold;
}
.button1 > button {
  margin: 10px 12px;
  text-align: center;
  transform: translate(
    50%,
    30%
  ); /* menengahkan element scr horizontal & vertical */
  background-color: #962300;
}
i {
    font-size: 1.4em;
    color: black;
    justify-items: space-between;
}
::placeholder {
  color: #cccccc;
}
</style>