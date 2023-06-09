import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  resolve: {
    alias:{
      '@': resolve( __dirname, './src' )
    }
  },
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://elm.cangdu.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
  css: {
    preprocessorOptions: {
      // 导入scss预编译程序
      scss: {
        // additionalData: `@use "@/assets/style/mixin.scss" as *;`,
        additionalData: `@import '@/assets/style/mixin.scss';`
      },
    },
  },
  plugins: [vue()],
  // 配置plugins中的mdEditor
  optimizeDeps: {
    include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
  },
})
