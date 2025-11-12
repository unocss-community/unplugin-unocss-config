<script lang='ts' setup>
// 测试全局变量注入
// eslint-disable-next-line no-console
console.log('=== UnoCSS Config Test ===')
// eslint-disable-next-line no-console
console.log('Theme:', __UNO_THEME__)
// eslint-disable-next-line no-console
console.log('Config:', __UNO_CONFIG__)

// 提取预设和转换器信息
const presets = __UNO_CONFIG__.presets?.map((p: any) => p.name) || []
const transformers = __UNO_CONFIG__.transformers?.map((t: any) => t.name) || []

// 访问主题配置
const themeFontFamily = __UNO_THEME__.fontFamily || {}
</script>

<template>
  <div class="p-4 text-white">
    <h1 class="text-2xl font-bold mb-4">
      UnoCSS Config Runtime Access
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
