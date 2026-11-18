// Generates src/styles/theme.css from the WEX shadcn UI Kit's Figma variables.
//
// Runs inside Figma (Plugin API), not Node: an agent passes this file's contents
// to the Figma MCP `use_figma` tool with fileKey fnEkt5u9OYBlzOTEXoWuan and writes
// the returned string to src/styles/theme.css verbatim.
//
// Mapping:
//   "1. TailwindCSS" wex colors/*        -> --color-wex-*  (Tailwind palette, @theme)
//   "3. Mode" tokens with WEB code syntax -> --<name> in :root (Light) and .dark (Dark)
//   "2. Theme" radius/*, font/font-*      -> --radius-*, --font-*
// Mode tokens without WEB code syntax (alpha/*, custom/*) are Figma-only helpers;
// in code they are opacity modifiers such as bg-primary/5.

const FILE_KEY = 'fnEkt5u9OYBlzOTEXoWuan'
const cols = await figma.variables.getLocalVariableCollectionsAsync()
const byId = new Map()
for (const c of cols) for (const id of c.variableIds) byId.set(id, await figma.variables.getVariableByIdAsync(id))
const collOf = new Map(cols.map((c) => [c.id, c]))
const mode = cols.find((c) => c.name === '3. Mode')
const theme = cols.find((c) => c.name === '2. Theme')
const tw = cols.find((c) => c.name === '1. TailwindCSS')

const h2 = (x) => Math.round(x * 255).toString(16).padStart(2, '0')
const hex = (c) => '#' + h2(c.r) + h2(c.g) + h2(c.b)
const slug = (s) => s.replace(/\//g, '-').replace(/\s+/g, '-')
const webName = (v) => {
  const m = v.codeSyntax?.WEB?.match(/^var\(--([\w-]+)\)$/)
  return m ? m[1] : null
}
const mix = (ref, op) =>
  op >= 99.95 ? ref : `color-mix(in srgb, ${ref} ${+op.toFixed(2)}%, transparent)`
const issues = []
const valueFor = (v, modeId) =>
  v.valuesByMode[modeId] ?? v.valuesByMode[collOf.get(v.variableCollectionId).modes[0].modeId]

function toCss(val, modeId, op, self) {
  if (val?.color?.type === 'VARIABLE_ALIAS') return toCss(val.color, modeId, (op * (val.opacity ?? 100)) / 100, self)
  if (val?.type === 'VARIABLE_ALIAS') {
    const t = byId.get(val.id)
    if (!t) {
      issues.push(`${self}: alias to a non-local variable`)
      return 'unset'
    }
    if (t.name.startsWith('wex colors/')) return mix(`var(--color-wex-${slug(t.name.slice(11))})`, op)
    if (t.name.startsWith('tailwind colors/')) {
      const rest = t.name.slice(16)
      if (rest === 'base/white') return mix('var(--color-white)', op)
      if (rest === 'base/black') return mix('var(--color-black)', op)
      if (rest.startsWith('base/')) return mix('transparent', op)
      return mix(`var(--color-${slug(rest)})`, op)
    }
    if (t.variableCollectionId === mode.id && webName(t) && webName(t) !== self) return mix(`var(--${webName(t)})`, op)
    return toCss(valueFor(t, modeId), modeId, op, self)
  }
  if (val && typeof val === 'object' && 'r' in val) {
    const a = (val.a ?? 1) * op
    if (a >= 99.95) return hex(val)
    if (a <= 0.05) return 'transparent'
    return `color-mix(in srgb, ${hex(val)} ${+a.toFixed(2)}%, transparent)`
  }
  issues.push(`${self}: unexpected value ${JSON.stringify(val)}`)
  return 'unset'
}

const palette = tw.variableIds
  .map((id) => byId.get(id))
  .filter((v) => v.name.startsWith('wex colors/'))
  .map((v) => `  --color-wex-${slug(v.name.slice(11))}: ${hex(valueFor(v, tw.modes[0].modeId))};`)

const light = mode.modes.find((m) => m.name === 'Light').modeId
const dark = mode.modes.find((m) => m.name === 'Dark').modeId
const groups = {}
const seen = new Set()
for (const id of mode.variableIds) {
  const v = byId.get(id)
  const n = webName(v)
  if (!n || seen.has(n) || v.resolvedType !== 'COLOR') continue
  seen.add(n)
  ;(groups[v.name.split('/')[0]] ||= []).push({
    n,
    l: toCss(v.valuesByMode[light], light, 100, n),
    d: toCss(v.valuesByMode[dark], dark, 100, n),
  })
}
const order = ['background', 'text', 'border', 'focus-ring', 'sidebar', 'chart']
const gnames = [...order.filter((g) => groups[g]), ...Object.keys(groups).filter((g) => !order.includes(g))]
const block = (k) =>
  gnames.map((g) => `  /* ${g} */\n` + groups[g].map((t) => `  --${t.n}: ${t[k]};`).join('\n')).join('\n\n')

const rem = (px) => `${+(px / 16).toFixed(4)}rem`
const radius = []
const fonts = {}
for (const id of theme.variableIds) {
  const v = byId.get(id)
  const val = valueFor(v, theme.modes[0].modeId)
  if (v.name.startsWith('radius/')) radius.push(`  --radius-${v.name.slice(7)}: ${rem(val)};`)
  if (v.name.startsWith('font/font-')) fonts[v.name.slice(10)] = val
}
const stack = {
  sans: 'ui-sans-serif, system-ui, sans-serif',
  serif: 'ui-serif, serif',
  mono: 'ui-monospace, monospace',
  display: 'ui-sans-serif, system-ui, sans-serif',
}
// Bundled Fontsource families go first so a locally installed copy of the same
// font can't override them. Keep in sync with the font imports in src/index.css.
const bundled = { sans: 'Inter Variable', mono: 'Roboto Mono Variable' }
const fontLines = Object.entries(fonts).map(([k, f]) => {
  const names = bundled[k] ? [bundled[k], f] : [f]
  return `  --font-${k}: ${names.map((n) => `'${n}'`).join(', ')}, ${stack[k] ?? 'sans-serif'};`
})

if (issues.length) throw new Error('Unresolved tokens:\n' + issues.join('\n'))

return `/*
 * GENERATED from the WEX shadcn UI Kit (Figma file ${FILE_KEY}).
 * Do not edit by hand: change the Figma variables, then rerun
 * scripts/figma/generate-theme-css.js and replace this file.
 */

@theme static {
${palette.join('\n')}
${fontLines.join('\n')}
  --radius: ${radius.find((r) => r.includes('-lg:')).split(': ')[1]}
${radius.join('\n')}
}

@theme inline {
  --font-heading: var(--font-sans);
${gnames.flatMap((g) => groups[g]).map((t) => `  --color-${t.n}: var(--${t.n});`).join('\n')}
}

:root {
${block('l')}
}

.dark {
${block('d')}
}
`
