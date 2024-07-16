import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
      vue(),
        vuetify(),
    ],
    //路径别名
    resolve: {
        // https://cn.vitejs.dev/config/#resolve-alias
        alias: {
            // 设置路径
            '~': resolve(__dirname, './'),
            // 设置别名
            '@': resolve(__dirname, './src'),
        },
        // https://cn.vitejs.dev/config/#resolve-extensions
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    build: {
        outDir: '../dist/',
    },
})
