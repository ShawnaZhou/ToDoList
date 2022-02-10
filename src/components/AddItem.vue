<template>
	<div class="container">
		<h1>Add Item</h1>
		<el-icon color="lightgreen" :size="30">
			<CirclePlusFilled />
		</el-icon>
		<el-row class="firstRow">
			<h3>Choose time</h3>
			<el-date-picker
				v-model="time"
				value-format="YYYY/MM/DD hh:mm:ss"
				type="datetime"
				placeholder="Select date and time"
				:default-time="defaultTime"
			>
			</el-date-picker>
		</el-row>
		<el-row class="firstRow">
			<h3>What need to do</h3>
			<el-input v-model="input" placeholder="Type items you need to do" />
		</el-row>
		<el-row class="firstRow">
			<button @click="send" class="btnConfirm">Confirm</button>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import bus from 'vue3-eventbus';
import { useStore } from 'vuex';
import { CirclePlusFilled } from '@element-plus/icons-vue';

const input = ref('');
const time = ref('');
const store = useStore();

const messageShow = (content: string, msgType: any) => {
	ElMessage({
		message: content,
		type: msgType,
	});
};

const defaultTime = new Date();
const send = () => {
	if (input.value.length === 0) {
		messageShow("oops you haven't input any things you want to do", 'error');
		return;
	}
	if (time.value.length === 0) {
		messageShow("oops you haven't choose any time yet", 'error');
		return;
	}
	messageShow('Add success', 'success');
	let tempData = {
		time: time.value,
		data: input.value,
	};
	console.log(tempData);
	bus.emit('addItem', tempData);
	store.dispatch('setToDoList', tempData);
	input.value = '';
	time.value = '';
};
</script>

<style scoped>
.container {
	margin: 1rem 0;
	width: 96%;
	height: 100%;
	padding: 1rem 2%;
	background-color: #353535;
	color: #fff;
}
.firstRow {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 1rem;
}
.btnConfirm {
	margin-top: 1rem;
	margin-bottom: 0;
	background: #000;
	width: 8rem;
}
.btnConfirm:hover {
	background: #f5f5f5;
	color: #000;
}
</style>
