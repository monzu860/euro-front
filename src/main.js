import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery.js';
import 'bootstrap/dist/js/bootstrap.min.js';
let remote_url;
window.remote_url='http://127.0.0.1:8000/api';
createApp(App).use(router).mount('#app');

