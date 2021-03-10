<template>
  <div class="index container">
    <div class="card" v-for="todo in todoLists" :key="todo.id">
      <div class="card-content">
        <i class="material-icons plus" @click="handleDelete(todo.id)">delete</i>
        <h2 class="indigo-text">{{ todo.title }}</h2>
        <!-- cara ini menampilkan array didalam array -->
        <ul class="category">
          <li v-for="(category, index) in todo.categorys" :key="index">
            <span class="chip">{{ category }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn halfway-fab orange accent-3">
        <!-- //params berdasarkan nilai v-for yang ada pada todolists -->
        <router-link :to="{name: 'EditTodoList', params: {slug: todo.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { projectFirestore } from "../firebase/config";

export default {
  name: "Index",
  data() {
    return {
      todoLists: [],
    };
  },
  methods: {
    //parameter id untuk handle delete return untuk fungsi filter
    handleDelete(id) {
      //delete doc from cloud firestore dengan paramater id kemudian delete
      projectFirestore
        .collection("todoLists")
        .doc(id)
        .delete()
        //fungsi then ini agar langsung terupdate di front end nya
        .then(() => {
          this.todoLists = this.todoLists.filter((todoList) => {
            return todoList.id != id;
          });
        });
    },
  },
  //interact with cloud firestore
  created() {
    //fetch data dr cloud firestore
    projectFirestore
      .collection("todoLists")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //console.log(doc.data(), doc.id)
          let todoList = doc.data();
          todoList.id = doc.id;
          //push objek todo list
          this.todoLists.push(todoList);
        });
      });
  },
};
</script>
<style scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .category {
  margin: 30px auto;
}
.index .category li {
  display: inline-block;
}
/* cara memindahkan icons dari posisi pojok kiri atas ke kanan atas*/
.index .plus {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.2em;
}
.index .edit {
  position: absolute;
  right: 10px;
  font-size: 1.4em;
}
</style>
