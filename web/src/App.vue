<script setup>
import { ref, provide, nextTick, computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
watch(() => route.path, () => {
  refresh()
})
const keepAliveIncludes = reactive(new Set())
provide('keepAliveIncludes', {
  add: name => keepAliveIncludes.add(name),
  remove: name => keepAliveIncludes.delete(name)
})
const isRefresh = ref(true)
const refresh = () => {
  isRefresh.value = false
  nextTick(() => {
    isRefresh.value = true
  })
}
provide('refresh', refresh)
</script>

<template>
  <router-view v-if="isRefresh" v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style scoped>
</style>
