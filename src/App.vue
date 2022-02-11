<template>
	<div class="containerMain">
		<AddItem />
		<ToDoList></ToDoList>/>
		<DoneList />
	</div>
</template>

<script setup lang="ts">
import AddItem from './components/AddItem.vue';
import DoneList from './components/DoneList.vue';
import ToDoList from './components/ToDoList.vue';
import { useStore } from './store/store';
import { onMounted } from 'vue';

onMounted(() => {
	const store = useStore();
	store.$subscribe((mutation, state) => {
		console.log('watcher: ', mutation.type, 'other:', mutation);
		console.log(state);
		localStorage.setItem('localStateLongTimeStorage', JSON.stringify(state));
	});
});
</script>

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
	background-image: url('../src/assets/pexels-khairul-nizam-16516.jpg');
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
