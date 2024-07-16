import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import 'bulma'

import App from './App.vue'
const app = createApp(App)
import router from './router/index'
import { vuetify } from './plugins/vuetify'

app.use(router)
app.use(vuetify)
app.use(createPinia())
app.mount('#app')

window.globalRouter = router
