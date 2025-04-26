import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: '@import "@/client/styles/variables.scss"; @import "@/client/styles/base.scss";', // 全局sass变量文件
      }
    }
  },
  build: {
    outDir: path.resolve(__dirname, './dist/client'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './src/client/main.ts')
      }
    }
  }
})
