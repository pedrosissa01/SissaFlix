import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'
import VueTheMask from 'vue-the-mask'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('Icon', Icon)

app.use(createPinia())
app.use(VueTheMask)
app.use(router)

app.mount('#app')
