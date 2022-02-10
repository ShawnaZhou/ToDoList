<template>
	<div class="container">
		<h1>Done List</h1>
		<el-icon color="lightgreen" :size="30">
			<CircleCheckFilled />
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
			<el-table-column property="data" label="Things have done" />
		</el-table>
		<div class="tableFooter">
			<button class="btnDelete" @click="deleteThings" v-show="multipleSelection.length > 0">Delete</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import bus from 'vue3-eventbus';
import { useStore } from 'vuex';
import type { ElTable } from 'element-plus';
import { CircleCheckFilled } from '@element-plus/icons-vue';

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

bus.on('doneThings', (e: ToDo[]) => {
	console.log(store.getters.getDoneList);
	tableData.value = tableData.value.concat(e);
	localStorage.setItem('doneList', JSON.stringify(tableData.value));
});

const handleSelectionChange = (val: ToDo[]) => {
	multipleSelection.value = val;
};

const deleteRow = (index: number) => {
	tableData.value.splice(index, 1);
	localStorage.setItem('doneList', JSON.stringify(tableData.value));
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
</style>
