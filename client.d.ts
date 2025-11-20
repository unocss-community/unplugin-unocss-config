interface Colors {
  [key: string]: Colors & { DEFAULT?: string } | string
}

interface ThemeAnimation {
  keyframes?: Record<string, string>
  durations?: Record<string, string>
  timingFns?: Record<string, string>
  properties?: Record<string, object>
  counts?: Record<string, string | number>
  category?: Record<string, string>
}

interface Theme {
  // From theme
  font?: Record<string, string>
  colors?: Colors
  spacing?: Record<string, string>
  breakpoint?: Record<string, string>
  verticalBreakpoint?: Record<string, string>
  container?: Record<string, string>
  text?: Record<string, { fontSize?: string, lineHeight?: string, letterSpacing?: string }>
  fontWeight?: Record<string, string>
  tracking?: Record<string, string>
  leading?: Record<string, string>
  radius?: Record<string, string>
  shadow?: Record<string, string | string[]>
  insetShadow?: Record<string, string | string[]>
  dropShadow?: Record<string, string | string[]>
  textShadow?: Record<string, string | string[]>
  ease?: Record<string, string>
  animate?: Record<string, string>
  blur?: Record<string, string>
  perspective?: Record<string, string>
  textStrokeWidth?: Record<string, string>
  property?: Record<string, string>
  default?: Record<string, Record<string, string>>
  animation?: ThemeAnimation
  duration?: Record<string, string>
  containers?: {
    center?: boolean
    padding?: string | Record<string, string>
    maxWidth?: Record<string, string>
  }
  aria?: Record<string, string>
  data?: Record<string, string>
  media?: Record<string, string>
  supports?: Record<string, string>

  // From client.d.ts (additional fields not in theme.ts)
  width?: Record<string, string>
  height?: Record<string, string>
  maxWidth?: Record<string, string>
  maxHeight?: Record<string, string>
  minWidth?: Record<string, string>
  minHeight?: Record<string, string>
  inlineSize?: Record<string, string>
  blockSize?: Record<string, string>
  maxInlineSize?: Record<string, string>
  maxBlockSize?: Record<string, string>
  minInlineSize?: Record<string, string>
  minBlockSize?: Record<string, string>
  borderRadius?: Record<string, string>
  breakpoints?: Record<string, string>
  verticalBreakpoints?: Record<string, string>
  borderColor?: Colors
  backgroundColor?: Colors
  textColor?: Colors
  shadowColor?: Colors
  accentColor?: Colors
  fontFamily?: Record<string, string>
  fontSize?: Record<string, string | [string, string | import('unocss').CSSObject] | [string, string, string]>
  lineHeight?: Record<string, string>
  letterSpacing?: Record<string, string>
  wordSpacing?: Record<string, string>
  boxShadow?: Record<string, string | string[]>
  textIndent?: Record<string, string>
  ringWidth?: Record<string, string>
  lineWidth?: Record<string, string>
  zIndex?: Record<string, string>
  easing?: Record<string, string>
  gridAutoColumn?: Record<string, string>
  gridAutoRow?: Record<string, string>
  gridColumn?: Record<string, string>
  gridRow?: Record<string, string>
  gridTemplateColumn?: Record<string, string>
  gridTemplateRow?: Record<string, string>
}

declare module 'virtual:unocss-config' {
  export const config: import('unocss').UserConfig<Theme>
  export const theme: Theme
  const _default: {
    config: import('unocss').UserConfig<Theme>
    theme: Theme
  }
  export default _default
}
