import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import ElementPlus from 'element-plus';
import eventBus from 'vue3-eventbus';
import 'element-plus/dist/index.css';
import './style/theme/main.css';
import './style/theme/index.css';

createApp(App).use(ElementPlus).use(eventBus).use(createPinia()).mount('#app');
