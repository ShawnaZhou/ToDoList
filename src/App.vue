<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import AddItem from "./components/AddItem.vue";
import DoneList from "./components/DoneList.vue";
import ToDoList from "./components/ToDoList.vue";
</script>

<template>
  <div class="containerMain">
    <AddItem />
    <ToDoList />
    <DoneList />
  </div>
</template>

<style>
#app {
  overflow-x: hidden;
  max-width: 100vw;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: red;
  text-align: center;
  padding: 2vh 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../src/assets/pexels-khairul-nizam-16516.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: brightness(30%);
}
.containerMain {
  overflow-x: hidden;
  background-color: #141414;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem 1rem 1rem 1rem;
}
</style>
