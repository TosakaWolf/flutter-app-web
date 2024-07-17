import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
const app = createApp(App)

import './style.css'
import '@nutui/nutui/dist/style.css'

import router from './router/index'
import { vuetify } from './plugins/vuetify'

app.use(router)
app.use(vuetify)
app.use(createPinia())
app.mount('#app')

window.globalRouter = router
import '@/android/androidCall'
if (import.meta.env.DEV) {
  import('@/android/androidMock')
}
