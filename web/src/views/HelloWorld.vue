<script setup>
import * as androidApi from '@/android/androidApi'
import { ref } from 'vue'
import { showNotify } from '@nutui/nutui'

const count = ref(0)
const showToastBottom = () => {
  androidApi.showToastBottom('showToastBottom')
}
const helloWorld = () => {
  androidApi.helloWorld('hello world', 'hello Ben', 'hello Emma').then(res => {
    showNotify.success(res.message)
  })
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo">
    </a>
  </div>
  <h1>Vite + Vue</h1>

  <div class="card">
    <v-row justify="center" class="mb-2">
      <v-btn variant="outlined" @click="count++">count is {{ count }}</v-btn>
    </v-row>
    <v-row justify="center" class="mb-2">
      <v-btn variant="outlined" @click="showToastBottom">show Android toast</v-btn>
    </v-row>
    <v-row justify="center" class="mb-2">
      <v-btn variant="outlined" @click="helloWorld">helloWorld</v-btn>
    </v-row>
    <v-row justify="center" class="mb-2">
      <p>
        Edit
        <code>views/HelloWorld.vue</code> to test HMR
      </p>
    </v-row>

  </div>

  <p>
    Check out
    <a
      href="https://vuejs.org/guide/quick-start.html#local"
      target="_blank"
    >create-vue</a>, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
    >Vue Docs Scaling up Guide</a>.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
