<template>

  <!-- form login(create account).prevent mencegah form ketika submit reload page -->
  <form @submit.prevent="handleSubmit">
    <h2>Signup Form</h2>
    <!-- email. . v-model untuk menunjuk data binding 2 arah:template & data -->
    <label>Email :</label>
    <input type="email" required v-model="email" placeholder="email" />

    <!-- password -->
    <label>Password :</label>
    <input type="password" required v-model="password" autocomplete="on" placeholder="password"/>
    <div class="errorMsg" v-if="passwordError">{{ passwordError }}</div>

    <!-- job role -->
    <label>Role :</label>
    <select v-model="role">
      <option value="developer">Web Developer</option>
      <option value="designer">Web Designer</option>
    </select>

    <!-- skill -->
    <!-- v-for harus ada key yang dibind -->
    <label>Skills : (use alt + /) for input skill </label>
    <input type="text" v-model="tempSkill" @keydown.alt="addSkill" placeholder="kemampuan kamu. e.g Html,Css,Javascript"/>
    <div v-for="skill in skills" :key="skill" class="fillSkill">
      <!-- fungsi delete -->
      <span @click="deleteSkill(skill)">{{ skill }}</span>
    </div>

    <!-- terms and conditions -->
    <div class="terms">
      <input type="checkbox" v-model="terms" required />
      <label>Accepts term and conditions</label>
    </div>

    <div class="submit">
      <button>Create an account</button>
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
    //e= event
    addSkill(e) {
      //skill didatambahkan didalam if(push) Skill dan jika 'coma' ditekan.
      if (e.key === "/" && this.tempSkill) {
        //if(includes) ini mencegah nilai yang sama ada dalam output(dinegasikan agar false)
        if (!this.skills.includes(this.tempSkill)) {
          this.skills.push(this.tempSkill
          .replace(/\s/g,'')
          .toLowerCase()
          );

        }
        this.tempSkill = "";
      }
    },
    deleteSkill(skill) {
      this.skills = this.skills.filter((item) => {
        return skill !== item
      });
    },
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
        console.log("role :", this.role);
        console.log("skills : ", this.skills);
        console.log("terms :", this.terms);
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
input,
select {
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
select {
  font-weight: bold;
}
input[type="checkbox"] {
  display: inline-block;
  width: 15px; /* ukuran checkbox yang pas 1em=16px */
  position: relative;
  margin: 0 12px 0 0;
  border: 1px solid #ddd !important;
}
/* beri style pada output div skill */
.fillSkill {
  display: inline-block;
  margin: 15px 5px 0 0px;
  background: slateblue;
  color: white;
  padding: 5px 15px;
  border-radius: 8px;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
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
::placeholder{
  color: #aaa;
}
</style>