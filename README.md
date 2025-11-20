# unplugin-unocss-config

[![NPM version](https://img.shields.io/npm/v/unplugin-unocss-config?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-unocss-config)

Access UnoCSS configuration at runtime in your application through virtual modules.

## Features

- 🔄 **Automatic Detection**: Detects UnoCSS plugin and reuses its context
- 🚀 **Virtual Module**: Import config via `virtual:unocss-config`
- 🔥 **HMR Support**: Hot module reload when UnoCSS config changes
- 🎨 **Type Safe**: Full TypeScript support with type definitions
- 📦 **Tree-shakable**: Only serializes necessary configuration data

## How It Works

This plugin detects the `unocss:api` plugin and retrieves the UnoCSS context, generator instance, and config sources. It then provides the serialized configuration through a virtual module (`virtual:unocss-config`), allowing runtime access to:
- Theme configuration (colors, fonts, spacing, breakpoints, etc.)
- Preset names
- Transformer names
- Other serializable config options

**Important**: This plugin requires the UnoCSS Vite plugin (`@unocss/vite`) to be installed and configured before it.

## Usage

```vue
<script lang='ts' setup>
import { config, theme } from 'virtual:unocss-config'

// Access full config
console.log(config)
console.log(theme)

// Use config data
const presets = config.presets?.map((p: any) => p.name)
const transformers = config.transformers?.map((t: any) => t.name)
const fontFamily = theme.fontFamily
const colors = theme.colors
</script>
```

## Install

```bash
pnpm add unplugin-unocss-config
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnoCSS from '@unocss/vite'
import UnoCSSConfig from 'unplugin-unocss-config/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(), // Required: UnoCSS plugin must be added first
    UnoCSSConfig({
      debug: false, // Enable debug logging (optional)
    }),
  ],
})
```

### Type Definitions
Add the type reference to enable TypeScript support for the virtual module:

```ts
// vite-env.d.ts or env.d.ts
/// <reference types="unplugin-unocss-config/client" />
```

This provides type definitions for:
- `virtual:unocss-config` module
- Theme types (colors, fonts, spacing, etc.)
- Config types

Example: [`playground/`](./playground/)

</details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    'unplugin-unocss-config/nuxt',
  ],
  unoCSSConfig: {
    debug: false, // Enable debug logging (optional)
  },
})
```

<br></details>

## Options

```ts
interface Options {
  /**
   * Enable debug mode to see plugin operation logs
   * @default false
   */
  debug?: boolean
}
```

## Virtual Module API

### `virtual:unocss-config`

Import the config and theme:

```ts
import { config, theme } from 'virtual:unocss-config'
```

Or import the default export:

```ts
import unoConfig from 'virtual:unocss-config'
// unoConfig.config
// unoConfig.theme
```

#### `config`
The UnoCSS configuration object (serialized). Contains:
- `presets`: Array of preset objects with names
- `transformers`: Array of transformer objects with names
- `theme`: Theme configuration
- `safelist`: Safelist patterns
- Other serializable config options

**Note**: Functions and certain complex objects (rules, variants, shortcuts, layers, preflights, extractors, autocomplete) are excluded from serialization.

#### `theme`
Direct access to the theme configuration object, including:
- `colors`: Color palette
- `fontFamily`: Font families
- `fontSize`: Font size scale
- `spacing`: Spacing scale
- `breakpoints`: Responsive breakpoints
- `borderRadius`: Border radius values
- `boxShadow`: Box shadow values
- And more theme properties...

## HMR Support

The plugin automatically watches UnoCSS config files. When the config changes:
- The virtual module is invalidated
- HMR updates are triggered
- Your app receives the latest config without full reload

## License

MIT License &copy; 2023-PRESENT [Chris](https://github.com/zyyv)
