import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { loadFull } from 'tsparticles'
import Particles from 'vue3-particles'
import axios from 'axios'

// Axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://api.mercandanismanlik.com'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Accept'] = 'application/json'

// Sanctum CSRF cookie
axios.get('/sanctum/csrf-cookie').catch(error => {
  console.error('CSRF cookie error:', error)
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Particles)

app.mount('#app') 