import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

const root = app.mount('#app')

console.log(root.$el)