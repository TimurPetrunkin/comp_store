import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(autoAnimatePlugin);
app.mount('#app');
