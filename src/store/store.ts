import { defineStore } from 'pinia';
interface Item {
	time: string;
	data: string;
}
export const useStore = defineStore('storeId', {
	state: () => {
		return {
			toDoList: new Array(),
			doneList: new Array(),
		};
	},
	actions: {
		/** toDoList增加一件事项 */
		addToDoItem(data: Item) {
			this.$state.toDoList.push(data);
		},
		/** doneList增加事项，可多个添加 */
		addDoneList(data: Item[]) {
			this.$state.doneList = this.$state.doneList.concat(data);
		},
		/** 重新设置toDoList */
		setToDoList(data: Item[]) {
			this.$state.toDoList = data;
		},
		/** 重新设置doneList */
		setDoneList(data: Item[]) {
			this.$state.doneList = data;
		},
		/** 移除toDoList中的某项 */
		removeToDoItem(index: number) {
			this.$state.toDoList.splice(index, 1);
		},
		/** 移除doneList中的某项 */
		removeDoneItem(index: number) {
			this.$state.doneList.splice(index, 1);
		},
	},
});
