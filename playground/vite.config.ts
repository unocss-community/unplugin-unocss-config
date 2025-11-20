import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Unplugin from 'unplugin-unocss-config/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    Inspect(),
    Unplugin({
      debug: true,
    }),
  ],
})
