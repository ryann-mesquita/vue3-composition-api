<template>
    <h1>
        Lista de Tarefas
        <router-link :to="{name: 'todos.create'}"><i class="fas fa-plus-square"></i></router-link>
    </h1>
    <div v-if="loading">
        Carregando
    </div>
    <ul>
        <li v-for="todo in todos" :key="todo.identify">
            <todo 
                :todo="todo"
                @todoDeleted="removeTodoList"
                @todoUpdated="todoUpdated"
            />
        </li>
    </ul>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import TodoService from '@/services/todos.service';
import Todo from './Todo.vue';

const todos = ref([])
const loading = ref(false);


onMounted(() => {
    loading.value = true
    TodoService.getAll()
        .then(response => {
            console.log(response);
            todos.value = response.data.data
        })
        .catch(error => console.log(error))
        .finally(() => loading.value = false)

})

const removeTodoList = (todo) => todos.value.splice(todos.value.indexOf(todo), 1) 
const todoUpdated = (todo) => {
    todos.value[todos.value.indexOf(todo)] = todo
}

</script>