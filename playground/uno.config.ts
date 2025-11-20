import presetOnu from '@onu-ui/preset'
import { defineConfig, presetIcons, presetWind4 } from 'unocss'
import { presetUseful } from 'unocss-preset-useful'

export default defineConfig({
  theme: {
    fontFamily: {
      sans: '\'Inter\', sans-serif',
      mono: '\'Fira Code\', monospace',
    },
  },
  presets: [
    // presetUseful({
    //   icons: {
    //     extraProperties: {
    //       'display': 'inline-block',
    //       'vertical-align': 'middle',
    //     },
    //   },
    // }),

    presetWind4(),
    // presetIcons(),

    // presetOnu({
    //   color: '#FF5722',
    // }),
  ],
  preflights: [
    {
      getCSS() {
        return `html, body{
          background-color: #222;
        }`
      },
    },
  ],
})
