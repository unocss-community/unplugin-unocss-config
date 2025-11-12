# unplugin-unocss-config

[![NPM version](https://img.shields.io/npm/v/unplugin-unocss-config?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-unocss-config)

Access UnoCSS configuration at runtime in your application.

## Features

- 🔄 **Automatic Detection**: Detects UnoCSS plugin and reuses its context
- 🔧 **Standalone Mode**: Works without UnoCSS plugin by loading config directly
- 🌐 **Global Access**: Exposes config via global variables and `import.meta.env`
- 🎨 **Type Safe**: Full TypeScript support with type definitions
- 📦 **Tree-shakable**: Only serializes necessary configuration data

## How It Works

This plugin detects the `unocss:api` plugin and retrieves the UnoCSS context, generator instance, and config sources. It then injects the serialized configuration into your HTML as global variables via a `<script>` tag, allowing runtime access to:
- Theme configuration
- Preset names
- Transformer names
- Other serializable config options

**Important**: This plugin requires the UnoCSS Vite plugin (`unocss/vite`) to be installed and configured before it.

## Usage

```html
<script lang='ts' setup>
// Access UnoCSS config
console.log(__UNO_CONFIG__)
console.log(__UNO_THEME__)

// Use config data
const presets = __UNO_CONFIG__.presets?.map((p: any) => p.name)
const transformers = __UNO_CONFIG__.transformers?.map((t: any) => t.name)
const fontFamily = __UNO_THEME__.fontFamily
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
import UnoCSS from 'unocss/vite'
import UnoCSSConfig from 'unplugin-unocss-config/vite'

export default defineConfig({
  plugins: [
    UnoCSS(), // Required: UnoCSS plugin must be added first
    UnoCSSConfig({
      // Options
      debug: false, // Enable debug logging (optional)
    }),
  ],
})
```

### Type Definitions
```ts
// vite-env.d.ts or env.d.ts
/// <reference types="unplugin-unocss-config/client" />
```

Example: [`playground/`](./playground/)

</details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  modules: [
    ['unplugin-unocss-config/nuxt', {
      path: './uno.config.ts', // Custom config path (optional)
      debug: false, // Enable debug logging (optional)
    }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

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

## Available Global Variables

### `__UNO_CONFIG__`
The UnoCSS configuration object (serialized). Contains:
- `presets`: Array of preset names
- `transformers`: Array of transformer names
- `theme`: Theme configuration
- `safelist`: Safelist patterns
- Other serializable config options

**Note**: Functions, rules, variants, shortcuts are excluded from serialization.

### `__UNO_THEME__`
Direct access to the theme configuration object, including:
- `colors`: Color palette
- `fontFamily`: Font families
- `fontSize`: Font size scale
- `spacing`: Spacing scale
- `breakpoints`: Responsive breakpoints
- And more...

## License

MIT License &copy; 2023-PRESENT [Chris](https://github.com/zyyv)
