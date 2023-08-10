<template>
  <h1>To-Do List</h1>
  <div class="flex items-center">
    <input
      v-model="newtodoContent"
      @keyup.enter="addTask"
      placeholder="Add a new task"
      class="p-2 mr-3 w-full"
    />
    <button
      @click="addTask"
      :disabled="!newtodoContent"
      class="flex-shrink-0 text-white text-center py-2 px-3 bg-red-500"
    >
      Add task
    </button>
  </div>

  <ul class="py-5">
    <li
      v-for="task in todos"
      :key="task.id"
      :class="{ 'bg-green-100': task.done }"
      class="flex items-center justify-between mb-3 py-3 px-5"
    >
      <div class="flex items-center">
        <span>{{ task.content }}</span>
      </div>
      <div class="flex items-center">
        <button
          @click="doneTask(task.id)"
          :class="{active: task.done}"
          class="checked-btn flex-shrink-0 text-white text-center py-2 px-3"
        >
          ✅
        </button>
        <button
          @click="removeTask(task.id)"
          class="flex-shrink-0 text-white text-center py-2 px-3"
        >
          ❌
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy} from "firebase/firestore";
import { db } from "./firebase";


const newtodoContent = ref("");
const todos = ref([]);
const todosCollectionRef = collection(db, "todos");
const todoCollectionQuery = query(todosCollectionRef, orderBy("date"));

onMounted(() => {

  onSnapshot(todoCollectionQuery, (querySnapshot) => {
    const fbTodos = []
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done:doc.data().done,
      }
      fbTodos.push(todo)
    });
    todos.value = fbTodos
  })
})



const addTask = () => {

  addDoc(todosCollectionRef, {
    content: newtodoContent.value,
    done: false,
    date: Date.now(),
  });

  newtodoContent.value = "";
};

const doneTask = (id) => {
  const index = todos.value.findIndex((todo) => todo.id ===id);

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  });
};

const removeTask = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
};

</script>

<style>
button:disabled {
  opacity: 0.5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

#app {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 500px;
}

h1 {
  text-align: center;
  margin-bottom: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border-bottom: 1px solid #ccc;
}

</style>
