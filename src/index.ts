import { createUnplugin, type UnpluginFactory } from 'unplugin'
import type { UnocssVitePluginAPI } from '@unocss/vite'
import type { Plugin } from 'vite'
import type { Options } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  let uno: any
  let _sources: string[]
  let configToInject: any = null

  return {
    name: 'unplugin-unocss-config',
    vite: {
      async configResolved(config) {
        const unoPlugin = config.plugins?.find((p): p is Plugin => {
          return !!p && typeof p === 'object' && 'name' in p && p.name === 'unocss:api'
        })

        if (unoPlugin && 'api' in unoPlugin) {
          try {
            const ctx = (unoPlugin.api as UnocssVitePluginAPI).getContext()
            await ctx.ready
            uno = ctx.uno
            _sources = ctx.getConfigFileList()

            if (options?.debug) {
              // eslint-disable-next-line no-console
              console.log('[unplugin-unocss-config] Using UnoCSS plugin uno context', ctx.uno)
              // eslint-disable-next-line no-console
              console.log('[unplugin-unocss-config] Config sources:', _sources)
            }

            // 序列化配置
            const serializeConfig = (obj: any): string => {
              return JSON.stringify(obj, (key, value) => {
                if (typeof value === 'function') {
                  return undefined
                }

                if (value && typeof value === 'object') {
                  if (key === 'presets' || key === 'transformers') {
                    return value.map((item: any) => ({
                      name: item.name || 'anonymous',
                    }))
                  }

                  if (key === 'rules' || key === 'variants' || key === 'shortcuts') {
                    return undefined
                  }
                  if (key === 'layers' || key === 'preflights' || key === 'extractors') {
                    return undefined
                  }
                  if (key === 'autocomplete') {
                    return undefined
                  }

                  if (key === 'safelist' && Array.isArray(value)) {
                    return value
                  }
                }

                return value
              })
            }

            configToInject = {
              __UNO_CONFIG__: serializeConfig(uno.config),
              __UNO_THEME__: serializeConfig(uno.config.theme || {}),
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

      transformIndexHtml() {
        // 通过 transformIndexHtml 注入配置到页面
        if (!configToInject) {
          return []
        }

        return [
          {
            tag: 'script',
            injectTo: 'head-prepend',
            children: `
              window.__UNO_CONFIG__ = ${configToInject.__UNO_CONFIG__};
              window.__UNO_THEME__ = ${configToInject.__UNO_THEME__};
              if (typeof globalThis !== 'undefined') {
                globalThis.__UNO_CONFIG__ = window.__UNO_CONFIG__;
                globalThis.__UNO_THEME__ = window.__UNO_THEME__;
              }
            `,
          },
        ]
      },
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
