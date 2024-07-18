<script setup>
import { ref } from 'vue'
import router from '@/router'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-spacer />

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        />
      </v-app-bar>

      <v-main>
        <v-container>
          <v-btn variant="tonal" @click="router.push('/helloworld')">
            Hello World
          </v-btn>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>

</style>
