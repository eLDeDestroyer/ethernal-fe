import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/functions/v1': {
        target: 'https://fcvhrvhnlunssvyegxar.supabase.co',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
