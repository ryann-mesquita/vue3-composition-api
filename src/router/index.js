import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Todos from '@/views/Todos/Todos.vue'
import AddTodo from '@/views/Todos/AddTodo.vue'
import EditTodo from '@/views/Todos/EditTodo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/todos',
      name: 'todos.index',
      component: Todos
    },
    {
      path: '/todos/create',
      name: 'todos.create',
      component: AddTodo
    },
    {
      path: '/todos/:id/edit',
      name: 'todos.edit',
      component: EditTodo,
      props: true
    },
  ]
})

export default router
