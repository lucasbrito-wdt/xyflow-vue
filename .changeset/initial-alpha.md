---
"xyflow-vue": minor
---

**Initial alpha release.** Vue 3 port of xyflow built on `@xyflow/system`.

Shipped:
- Core renderer `<VueFlow>` with controlled/uncontrolled modes, TypeScript generics
- 4 built-in node types (`input`, `default`, `output`, `group`) and 5 edge types (`default`/bezier, `straight`, `step`, `smoothstep`, `<BaseEdge>`)
- 12 components: `<VueFlow>`, `<VueFlowProvider>`, `<Handle>`, `<Background>`, `<Controls>`, `<MiniMap>`, `<NodeToolbar>`, `<EdgeToolbar>`, `<NodeResizer>`, `<Panel>`, `<ViewportPortal>`, `<EdgeLabel>`, `<EdgeReconnectAnchor>`, `<Attribution>`
- 15 composables for reactive state and imperative helpers
- 36 event emits with full parity to `@xyflow/svelte`
- Keyboard shortcuts (Delete, Ctrl+A/C/X/V, Escape, Shift multi-select)
- Subflow containment via `parentId` + `extent: 'parent'`
- ColorMode (light/dark/system) + SSR-safe (no `window` in setup)
- Drop-in `applyNodeChanges` / `applyEdgeChanges` matching React Flow's API
