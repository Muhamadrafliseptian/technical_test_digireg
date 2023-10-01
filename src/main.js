import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "./components/core_style/style.css";
import "./components/core_style/style.js";
import 'leaflet/dist/leaflet'
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from './App.vue'
import store from './stores'
import router from './router'


const app = createApp(App)

app.use(createPinia())
AOS.init();
app.use(router)
app.use(store)

app.mount('#app')
