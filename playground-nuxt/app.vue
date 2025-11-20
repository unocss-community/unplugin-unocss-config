<script lang='ts' setup>
import { config, theme } from 'virtual:unocss-config'

// console.log('=== UnoCSS Config Test (Nuxt) ===')
// console.log('Theme:', theme)
// console.log('Config:', config)

const presets = config.presets?.map((p: any) => p.name) || []
const transformers = config.transformers?.map((t: any) => t.name) || []

const themeFontFamily = theme.fontFamily || {}
</script>

<template>
  <div class="p-4 text-white">
    <h1 class="text-2xl font-bold mb-4">
      UnoCSS Config Runtime Access (Nuxt)
    </h1>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">
        Presets
      </h2>
      <ul class="list-disc list-inside">
        <li v-for="name in presets" :key="name" class="text-green-400">
          {{ name }}
        </li>
      </ul>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">
        Transformers
      </h2>
      <ul class="list-disc list-inside">
        <li v-for="name in transformers" :key="name" class="text-blue-400">
          {{ name || 'No transformers configured' }}
        </li>
      </ul>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">
        Theme - Font Family
      </h2>
      <pre class="bg-gray-800 p-2 rounded text-sm">{{ JSON.stringify(themeFontFamily, null, 2) }}</pre>
    </section>
  </div>
</template>
