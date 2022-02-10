import { createStore } from 'vuex';

interface State {
	toDoList: any[];
	doneList: any[];
}

const store = createStore({
	state() {
		return {
			toDoList: [],
			doneList: [],
		};
	},
	getters: {
		getToDoList(state: State) {
			return state.toDoList;
		},
		getDoneList(state: State) {
			return state.doneList;
		},
	},
	actions: {
		setToDoList({ commit }, payload) {
			commit('addToDo', payload);
		},
		setDoneList({ commit }, payload) {
			commit('addDone', payload);
		},
	},
	mutations: {
		addToDo(state: any, payload: any) {
			state.toDoList = payload;
		},
		addDone(state: any, payload: any) {
			state.doneList = payload;
		},
	},
});

export default store;
