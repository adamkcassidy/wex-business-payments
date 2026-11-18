// Audits Figma screens against .cursor/rules/figma-design.mdc.
//
// Runs inside Figma (Plugin API), not Node: pass this file's contents to the Figma
// MCP `use_figma` tool with the screens file's fileKey, after setting ROOT_IDS to
// the frames to check. Read-only; returns findings grouped by rule.
//
// Layers inside component instances are skipped: they belong to the library and
// are checked there. Only what the screen itself owns is audited.

const ROOT_IDS = ['REPLACE_WITH_FRAME_ID']
const ALLOWED_COLOR_COLLECTIONS = ['3. Mode', 'Logo', 'Brand']
const MAX_EXAMPLES = 12

const findings = {
  notAutoLayout: [],
  absolute: [],
  rawColor: [],
  nonSemanticColor: [],
  unboundSpacing: [],
  unboundRadius: [],
  textWithoutStyle: [],
  localComponents: [],
}
const collName = new Map()
async function colorCollection(paint) {
  const id = paint.boundVariables?.color?.id
  if (!id) return null
  const v = await figma.variables.getVariableByIdAsync(id)
  if (!v) return 'missing'
  if (!collName.has(v.variableCollectionId)) {
    const c = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId)
    collName.set(v.variableCollectionId, c?.name ?? 'missing')
  }
  return { collection: collName.get(v.variableCollectionId), name: v.name }
}
const push = (k, n, detail) => findings[k].push({ id: n.id, name: n.name, ...(detail ? { detail } : {}) })

for (const rootId of ROOT_IDS) {
  const root = await figma.getNodeByIdAsync(rootId)
  if (!root) throw new Error('Node not found: ' + rootId)
  const stack = [root]
  while (stack.length) {
    const n = stack.pop()
    if (n.visible === false) continue

    if (n.type === 'INSTANCE') {
      const mc = await n.getMainComponentAsync()
      const asset = mc?.parent?.type === 'COMPONENT_SET' ? mc.parent : mc
      if (asset && !asset.remote) push('localComponents', n, asset.name)
      continue
    }

    if (n.type === 'FRAME' && n !== root && n.layoutMode === 'NONE' && n.children.length > 0) push('notAutoLayout', n)
    if ('layoutPositioning' in n && n.layoutPositioning === 'ABSOLUTE') push('absolute', n)

    for (const prop of ['fills', 'strokes']) {
      if (!(prop in n) || !Array.isArray(n[prop])) continue
      for (const p of n[prop]) {
        if (p.visible === false || p.type !== 'SOLID') continue
        const c = await colorCollection(p)
        if (!c) push('rawColor', n, prop)
        else if (c === 'missing' || !ALLOWED_COLOR_COLLECTIONS.includes(c.collection)) push('nonSemanticColor', n, `${prop}: ${c.collection ?? c}/${c.name ?? ''}`)
      }
    }

    if (n.type === 'FRAME' && n.layoutMode !== 'NONE') {
      const bv = n.boundVariables || {}
      const props = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing']
      const off = props.filter((p) => n[p] > 0 && !bv[p])
      if (off.length) push('unboundSpacing', n, off.join(', '))
    }
    if ('cornerRadius' in n && n.cornerRadius !== figma.mixed && n.cornerRadius > 0) {
      const bv = n.boundVariables || {}
      if (!bv.topLeftRadius && !bv.cornerRadius) push('unboundRadius', n, String(n.cornerRadius))
    }

    if (n.type === 'TEXT' && !n.textStyleId) push('textWithoutStyle', n)

    if ('children' in n) stack.push(...n.children)
  }
}

const summary = {}
for (const [k, v] of Object.entries(findings)) summary[k] = { count: v.length, examples: v.slice(0, MAX_EXAMPLES) }
return summary
