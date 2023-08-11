<template>
    <div>
        <h1>Adicionar Nova Tarefa</h1>
        <form action="#" method="post" @submit.prevent="addTodo">
            <input type="text" name="title" placeholder="title" v-model="todo.name">
            <input type="text" name="description" placeholder="description" v-model="todo.description">

        <button type="submit" :disabled="todo.loading">
            <span v-if="todo.loading">Enviando...</span>
            <span v-else>Enviar</span>
        </button>

        </form>
    </div>
</template>

<script setup>

import { reactive } from 'vue'
import TodoService from '@/services/todos.service';
import {ref} from 'vue';
import router from '@/router';
import Todos from './Todos.vue';

const props = defineProps({
    name: 'AddTodo'
})

/* const name = ref('');
const description = ref(''); */

const todo = reactive({
    name: '',
    description: '',
    completed: false,
    loading:false
})

const addTodo = () => {
    todo.loading = true
    TodoService.addTodo({...todo})
                .then(() => router.push({name: 'todos.index'}))
                .finally(() => todo.loading = false)
}

</script>