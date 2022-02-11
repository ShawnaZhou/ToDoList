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
			:data="doneList"
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
import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';
import type { ElTable } from 'element-plus';
import { CircleCheckFilled } from '@element-plus/icons-vue';

interface ToDo {
	/** 目标时间 */
	time: string;
	/** 目标事项 */
	data: string;
}

const store = useStore();
const { doneList } = storeToRefs(store);
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<ToDo[]>([]);

onMounted(() => {
	let tempData = localStorage.getItem('localStateLongTimeStorage');
	if (tempData) {
		let tempData2 = JSON.parse(tempData);
		if (tempData2.doneList.length > 0) {
			console.log('doneList: ' + tempData2.doneList);
			store.setDoneList(tempData2.doneList);
		}
	}
});

/** 表格选中项改变触发事件 */
const handleSelectionChange = (val: ToDo[]) => {
	multipleSelection.value = val;
};

/** 删除表格中事项 */
const deleteThings = () => {
	multipleSelection.value.forEach((item) => {
		let tempIndex = doneList.value.indexOf(item);
		store.removeDoneItem(tempIndex);
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
