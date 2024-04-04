<template>
  <div class="container">
    <h3 class="mb-5 title">Todolist</h3>
    <form @submit.prevent="onAddTodo">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input
            class="input"
            type="text"
            placeholder="Todolist"
            :value="content"
            @input="(event) => (content = event.target.value)"
          />
        </p>
        <p class="control">
          <button class="button is-info">Add</button>
        </p>
      </div>
    </form>
    <div class="card mt-5 mb-5" v-for="todo in todos" :key="todo.id">
      <div class="card-header p-3">
        <div
          class="card-header-title"
          :class="todo.status ? 'line-through' : ''"
        >
          {{ todo.content }}
        </div>
        <div class="is-grouped">
          <button
            class="button"
            :class="todo.status ? 'is-success' : ''"
            @click="onMarkTodo(todo.id)"
          >
            &check;
          </button>
          <button
            class="button is-danger ml-2"
            :disabled="!todo.status"
            @click="onDeleteTodo(todo.id)"
          >
            &cross;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../../node_modules/bulma/css/bulma.min.css";
import db from "@/firebase";
import { ref, onMounted } from "vue";
import {
  doc,
  query,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";

const content = ref("");

const todos = ref([]);

onMounted(async () => {
  onSnapshot(
    query(collection(db, "todos"), orderBy("date", "desc")),
    (querySnapshot) => {
      todos.value = [];
      querySnapshot.forEach((doc) => {
        const todo = {
          id: doc.id,
          content: doc.data().content,
          status: doc.data().status,
        };
        todos.value.unshift(todo);
      });
    }
  );
});

const onAddTodo = () => {
  if (content.value.length >= 0) {
    addDoc(collection(db, "todos"), {
      content: content.value,
      status: false,
      date: new Date(),
    });
    content.value = "";
  }
};

const onMarkTodo = async (id) => {
  const todo = todos.value.find((todo) => todo.id === id);
  await updateDoc(doc(collection(db, "todos"), id), {
    status: !todo.status,
  });
};

const onDeleteTodo = async (id) => {
  await deleteDoc(doc(collection(db, "todos"), id));
};
</script>

<style scoped>
.container {
  max-width: 400px;
  width: 400px;
}

.line-through {
  text-decoration: line-through;
}
</style>
