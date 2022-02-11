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
			:data="toDoList"
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
import { storeToRefs } from 'pinia';
import { useStore } from '../store/store';

interface ToDo {
	/** 时间 */
	time: string;
	/** 需完成的目标 */
	data: string;
}

const store = useStore();
const { toDoList } = storeToRefs(store);
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<ToDo[]>([]);

onMounted(() => {
	let tempData = localStorage.getItem('localStateLongTimeStorage');
	if (tempData) {
		let tempData2 = JSON.parse(tempData);
		if (tempData2.toDoList.length > 0) {
			console.log('alive');
			store.setToDoList(tempData2.toDoList);
		}
	}
});

/** 选中行改变触发事件 */
const handleSelectionChange = (val: ToDo[]) => {
	multipleSelection.value = val;
};

/** 完成表格中的事项 */
const doneThings = () => {
	store.addDoneList(multipleSelection.value);
	multipleSelection.value.forEach((item) => {
		let tempIndex = toDoList.value.indexOf(item);
		store.removeToDoItem(tempIndex);
	});
};

/** 删除表格中的事项 */
const deleteThings = () => {
	multipleSelection.value.forEach((item) => {
		let tempIndex = toDoList.value.indexOf(item);
		store.removeToDoItem(tempIndex);
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
