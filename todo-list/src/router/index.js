import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import AddTodoList from '../views/AddTodoList.vue'
import EditTodoList from '../views/EditTodoList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/add-todo',
    name: 'AddTodoList',
    component: AddTodoList
  },
  {
    path: '/edit-todo/:slug',
    name: 'EditTodoList',
    component: EditTodoList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
