import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadFull } from 'tsparticles'
import Particles from 'vue3-particles'

const app = createApp(App)

app.use(router)
app.use(Particles)

app.mount('#app') 