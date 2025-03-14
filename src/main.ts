import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadFull } from 'tsparticles'
import Particles from 'vue3-particles'
import axios from 'axios'

axios.defaults.baseURL = 'https://mercandanismanlik.com'
axios.defaults.withCredentials = true

// Sanctum CSRF cookie
axios.get('/sanctum/csrf-cookie').catch(error => {
  console.error('CSRF cookie error:', error)
})

const app = createApp(App)

app.use(router)
app.use(Particles)

app.mount('#app') 