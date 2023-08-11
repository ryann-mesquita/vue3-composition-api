<template>
    <div>
        <h1>Editar Tarefa</h1>
        <form action="#" method="post" @submit.prevent="editTodo">
            <input type="text" name="title" placeholder="title" v-model="todo.name">
            <input type="text" name="description" placeholder="description" v-model="todo.description">

        <button type="submit" :disabled="todo.loading">
            <span v-if="todo.loading">Aguarde...</span>
            <span v-else>Enviar</span>
        </button>

        </form>
    </div>
</template>

<script setup>

import { onMounted, reactive } from 'vue'
import TodoService from '@/services/todos.service';
import {ref} from 'vue';
import router from '@/router';
import Todos from './Todos.vue';

const name = ref('EditTodo');

const props = defineProps({
    id:{
        require: true,
    },
});

/* const name = ref('');
const description = ref(''); */

const todo = reactive({
    name: '',
    description: '',
    completed: false,
    loading:false
});

onMounted(async () => {
    todo.loading = true
    TodoService.getTodo(props.id)
                .then(response => {
                    const todoResponse = response.data.data
                    todo.name = todoResponse.title
                    todo.description = todoResponse.body
                    todo.completed = todoResponse.completed == 'S'
                })
                .finally(() => todo.loading = false)
})

const editTodo = () => {
    todo.loading = true
    TodoService.editTodo(props.id, {...todo})
                .then(() => router.push({name: 'todos.index'}))
                .finally(() => todo.loading = false)
}

</script>