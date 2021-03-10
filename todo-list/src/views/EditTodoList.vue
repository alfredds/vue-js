<template>
  <!-- untuk mencegah error meminta title saat data todoList ada -->
  <div class="container edit-todo" v-if="todoList">
    <h2>Edit {{ todoList.title }} Todo list</h2>
    <form @submit.prevent="editTodo">
      <div class="field title">
        <label for="title">Todo List Title :</label>
        <input type="text" name="title" v-model="todoList.title" required />
      </div>
      <div class="field add-category">
        <label for="add-category">Add an category(use space) :</label>
        <input
          type="text"
          name="add-category"
          @keydown.enter.prevent="addCategory()"
          v-model="category"
        />
        <div
          v-for="category in todoList.categorys"
          :key="category"
          class="chip"
        >
          {{ category }}
          <i class="material-icons delete" @click.prevent="deleteTodo(category)"
            >close</i
          >
        </div>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn orange accent-3">Update Todo List</button>
      </div>
    </form>
  </div>
</template>

<script>
import { projectFirestore } from "../firebase/config";
import slugify from 'slugify'

export default {
  name: "EditTodoList",
  data() {
    return {
      todoList: null,
      category: "",
      feedback: null,
    };
  },
  methods: {
    editTodo() {
      if (this.todoList.title) {
        this.feedback = null;
        //create a slug base a title
        this.todoList.slug = slugify(this.todoList.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g, //remove this character global
          lower: true,
        });

        // edit(update) db di firestore (promises) dengan menambahkan doc(todoList.id) ubah add menjadi update method
        projectFirestore
          .collection("todoLists")
          .doc(this.todoList.id)
          .update({
            title: this.todoList.title,
            categorys: this.todoList.categorys,
            slug: this.todoList.slug,
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.feedback = "u must enter the title of todolist";
      }
    },
    //add todoList karena berdasarkan nilai id masing" todoList didalam this.
    addCategory() {
      if (!this.todoList.categorys.includes(this.category)) {
        this.category = this.category.replace(/\s/g, "").toLowerCase(); //removes all whitespace global(spasi)(/\s/g) an lowercase
        this.todoList.categorys.push(this.category);
      } else {
        this.feedback =
          "You must enter a value to add an todo list and dont duplicate";
      }
      // kemudian clear form input dengan ini
      this.category = "";
    },
    deleteTodo(category) {
      this.todoList.categorys = this.todoList.categorys.filter((cate) => {
        return cate != category;
      });
    },
  },
  created() {
    //cara mengambil paramater berdasarkan name properti array
    let ref = projectFirestore
      .collection("todoLists")
      .where("slug", "==", this.$route.params.slug);
    //this async
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.todoList = doc.data();
        this.todoList.id = doc.id;
      });
    });
  },
};
</script>

<style>
.edit-todo {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-todo h2 {
  font-size: 2.2em;
  margin: 20px auto;
}
.edit-todo .field {
  margin: 20px auto;
}
.edit-todo label {
  font-size: 0.9em;
}
.edit-todo .delete {
  font-size: 1.2em;
  color: red;
  cursor: pointer;
  display: flexbox;
  justify-content: center;
  align-items: center;
}
</style>