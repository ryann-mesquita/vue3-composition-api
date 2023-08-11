<template>
    <div>
        <input type="checkbox" :checked="completed" @change="toogleStatus">   
        {{ props.todo.title }} - {{ props.todo.body }}
        <router-link :to="{name: 'todos.edit', params: {id: props.todo.identify}}"><i class="fas fa-edit"></i></router-link>
        <a href="#" @click.prevent="deleteTodo"><i class="fas fa-trash-alt"></i></a>
    </div>
</template>

<script setup>

    import {computed} from 'vue';
    import {ref} from 'vue';
    import TodoService from '@/services/todos.service';

    const emit = defineEmits(['inFocus', 'submit', 'todoDeleted'])
    const name = ref('Todo');
    const props = defineProps ({
        todo:{
            require:true,
            type: Object,
        }
    });

    const deleteTodo = () => {
        TodoService.deleteTodo(props.todo.identify)
                    .then(() => emit('todoDeleted', props.todo))
    }

    const completed = computed(() => props.todo.completed == 'S')

    const toogleStatus = () => {
        const todo = props.todo
        const params = {
            name: todo.title,
            description: todo.body,
            completed: !completed.value
        }
        TodoService.editTodo(props.todo.identify, params)
                    .then(() => emit('todoUpdated', props.todo))

    }
</script>