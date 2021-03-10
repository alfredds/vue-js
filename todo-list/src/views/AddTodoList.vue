<template>
  <div class="add-todo container">
    <h2 class="center-align indigo-text">Add New Todo List</h2>
    <form @submit.prevent="addTodo">
      <div class="field title">
        <label for="title">Todo List Title :</label>
        <input type="text" name="title" v-model="title" required/>
      </div>
      <div class="field add-category">
        <label for="add-category">Add an category(use space) :</label>
        <input
          type="text"
          name="add-category"
          @keydown.enter.prevent="addCategory()"
          v-model="category"
        />
        <div v-for="category in categorys" :key="category" class="chip">
          {{ category }}
          <i class="material-icons delete" @click.prevent="deleteTodo(category)">close</i>
        </div>
      </div>
      <div class="field center-align">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn orange accent-3">Add List</button>
      </div>
    </form>
  </div>
</template>

<script>
import { projectFirestore } from '../firebase/config'
import slugify from 'slugify'

export default {
  name: "AddTodoLists",
  data() {
    return {
      title: "",
      category: "",
      categorys: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    //add todolist ke firestore 
    addTodo() {
      if(this.title){
        this.feedback = null
        //create a slug base a title
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g, //remove this character global
          lower: true
        })

        // add db to firestore (promises)
        projectFirestore.collection("todoLists").add({
          title: this.title,
          categorys: this.categorys,
          slug: this.slug
        }).then(()=> {
          this.$router.push({name: 'Index'})
        }).catch(err=> {
          console.log(err)
        }) 
      } else {
        this.feedback = 'u must enter the title of todolist'
      }
    },
    addCategory() {
      if (!this.categorys.includes(this.category)) {
        this.category = this.category.replace(/\s/g,"").toLowerCase() //removes all whitespace global(spasi)(/\s/g) an lowercase
        this.categorys.push(this.category);
      } 
      else {
          this.feedback = 'You must enter a value to add an todo list and dont duplicate'
      }
      // kemudian clear form input dengan ini
      this.category = "";
    },
    deleteTodo(category) {
      this.categorys = this.categorys.filter(cate=> {
        return cate != category
      })
    }
  },
};
</script>

<style>
.add-todo {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-todo h2 {
  font-size: 2.2em;
  margin: 20px auto;
}
.add-todo .field {
  margin: 20px auto;
}
.add-todo label {
  font-size: 0.9em;
}
.add-todo .delete {
  font-size: 1.2em;
  color: red;
  cursor: pointer;
  display: flexbox;
  justify-content: center;
  align-items: center;
}
</style>