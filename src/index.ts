import type { UnocssPluginContext } from '@unocss/core'
import type { UnocssVitePluginAPI, VitePluginConfig } from '@unocss/vite'
import type { UnpluginFactory } from 'unplugin'
import type { HmrContext, Plugin } from 'vite'
import type { Options } from './types'
import { createUnplugin } from 'unplugin'

const IGNORED_KEYS = [
  'rules',
  'variants',
  'shortcuts',
  'layers',
  'preflights',
  'extractors',
  'autocomplete',
]

function serializeConfig(config: any): string {
  return JSON.stringify(config, (key, value) => {
    if (typeof value === 'function')
      return undefined

    if (IGNORED_KEYS.includes(key))
      return undefined

    if (key === 'presets' || key === 'transformers') {
      if (Array.isArray(value)) {
        return value.map((item: any) => ({
          name: item.name || 'anonymous',
        }))
      }
    }

    return value
  })
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  let uno: any
  let _sources: string[] = []
  let configToInject: { __UNO_CONFIG__: string, __UNO_THEME__: string } | null = null
  let ctx: UnocssPluginContext<VitePluginConfig> | undefined

  const MODULE_ID = 'virtual:unocss-config'
  const RESOLVED_MODULE_ID = `\0${MODULE_ID}`

  const updateConfig = (): void => {
    if (ctx && ctx.uno) {
      uno = ctx.uno
      configToInject = {
        __UNO_CONFIG__: serializeConfig(uno.config),
        __UNO_THEME__: serializeConfig(uno.config.theme || {}),
      }
    }
  }

  return {
    name: 'unplugin-unocss-config',
    vite: {
      async configResolved(config) {
        const unoPlugin = config.plugins?.find((p): p is Plugin => {
          return !!p && typeof p === 'object' && 'name' in p && p.name === 'unocss:api'
        })

        if (unoPlugin && 'api' in unoPlugin) {
          try {
            ctx = (unoPlugin.api as UnocssVitePluginAPI).getContext()
            await ctx.ready
            uno = ctx.uno
            _sources = ctx.getConfigFileList()

            updateConfig()

            if (options?.debug) {
              console.log('[unplugin-unocss-config] Using UnoCSS plugin uno context', ctx.uno)
              console.log('[unplugin-unocss-config] Config sources:', _sources)
            }
          }
          catch (error) {
            console.warn('[unplugin-unocss-config] Failed to get UnoCSS context:', error)
          }
        }
        else {
          console.warn('[unplugin-unocss-config] UnoCSS plugin not found. Please add @unocss/vite plugin before this plugin.')
        }
      },

      async handleHotUpdate(hmrContext: HmrContext) {
        const { file, server } = hmrContext
        if (_sources.includes(file)) {
          if (ctx) {
            await ctx.reloadConfig()
            _sources = ctx.getConfigFileList()
            updateConfig()
          }

          const mod = server.moduleGraph.getModuleById(RESOLVED_MODULE_ID)
          if (mod) {
            if (options?.debug) {
              console.log('[unplugin-unocss-config] HMR update for:', mod.url)
            }
            return [mod]
          }
        }
      },

      resolveId(id) {
        if (id === MODULE_ID)
          return RESOLVED_MODULE_ID
      },

      load(id) {
        if (id === RESOLVED_MODULE_ID) {
          return `
            export const config = ${configToInject?.__UNO_CONFIG__ || '{}'}
            export const theme = ${configToInject?.__UNO_THEME__ || '{}'}
            export default { config, theme }
          `
        }
      },
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
