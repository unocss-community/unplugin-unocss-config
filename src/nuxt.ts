import type { Options } from './types'
import { addVitePlugin, defineNuxtModule } from '@nuxt/kit'
import vite from './vite'

export interface ModuleOptions extends Options {

}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'unplugin-unocss-config',
    configKey: 'unocssConfig',
  },
  defaults: {
    debug: false,
  },
  setup(options, _nuxt) {
    addVitePlugin(() => vite(options))
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    unocssConfig?: ModuleOptions
  }
  interface NuxtOptions {
    unocssConfig?: ModuleOptions
  }
}
