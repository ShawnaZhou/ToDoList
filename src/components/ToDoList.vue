<template>
	<div class="container">
		<h1>To Do List</h1>
		<el-icon color="lightgreen" :size="30">
			<CircleCheck />
		</el-icon>
		<el-table
			ref="multipleTableRef"
			class="tableContainer"
			max-height="400"
			row-key="time"
			key="time"
			stripe
			:data="tableData"
			:default-sort="{ prop: 'time', order: 'ascending' }"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="55" />
			<el-table-column prop="time" label="Time" sortable width="180" column-key="time" />
			<el-table-column property="data" label="What need to do" show-overflow-tooltip />
		</el-table>
		<div class="tableFooter">
			<button class="btnDone" @click="doneThings" v-show="multipleSelection.length > 0">I'm Done</button>
			<button class="btnDelete" @click="deleteThings" v-show="multipleSelection.length > 0">Delete</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { CircleCheck } from '@element-plus/icons-vue';
import type { ElTable } from 'element-plus';
import bus from 'vue3-eventbus';
import { useStore} from 'vuex';

interface ToDo {
	time: string;
	data: string;
}

const store = useStore();
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<ToDo[]>([]);
const tableData = ref<ToDo[]>([]);

onMounted(() => {
	let tempData = localStorage.getItem('toDoList');
	if (tempData) {
		tableData.value = tableData.value.concat(JSON.parse(tempData));
	}
});

bus.on('addItem', (e: ToDo) => {
	console.log(store.getters.getToDoList,store.state.toDoList);
	tableData.value.push(e);
	localStorage.setItem('toDoList', JSON.stringify(tableData.value));
});

const handleSelectionChange = (val: ToDo[]) => {
	multipleSelection.value = val;
};

const deleteRow = (index: number) => {
	tableData.value.splice(index, 1);
	localStorage.setItem('toDoList', JSON.stringify(tableData.value));
};

const doneThings = () => {
	bus.emit('doneThings', multipleSelection.value);
	multipleSelection.value.forEach((item, index) => {
		let tempIndex = tableData.value.indexOf(item);
		deleteRow(tempIndex);
	});
};
const deleteThings = () => {
	multipleSelection.value.forEach((item, index) => {
		let tempIndex = tableData.value.indexOf(item);
		deleteRow(tempIndex);
	});
};
</script>

<style>
.container {
	margin: 1rem 0;
	width: 96%;
	height: 100%;
	padding: 1rem 2%;
	background-color: #353535;
	color: #fff;
}
.tableContainer {
	margin-top: 2rem;
	border: none;
	background-color: #4d4a4a !important;
}
.tableFooter {
	width: 100%;
	margin-top: 2rem;
	display: flex;
	justify-content: space-between;
}
.btnDone {
	background: #000;
	color: #fff;
	width: 8rem;
	align-self: flex-start;
}
.btnDone:hover {
	background: #f5f5f5;
	color: #000;
}
.btnDelete {
	background-color: red;
	color: #fff;
}
.btnDelete:hover {
	background: #353535;
	color: red;
}
</style>
