import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
const app = createApp(App)

import './style.css'
import '@nutui/nutui/dist/style.css'

import router from './router'
import { vuetify } from './plugins/vuetify'

window.globalRouter = router
import '@/android/androidCall'
import { mockAndroid } from '@/android/androidMock'
if (import.meta.env.DEV) {
  await mockAndroid()
}

app.use(router)
app.use(vuetify)
app.use(createPinia())
app.mount('#app')

