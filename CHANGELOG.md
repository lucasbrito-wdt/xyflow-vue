# Changelog

All notable changes to this project will be documented here. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

Initial public release of the unofficial Vue 3 port.

### Fixed
- `<VueFlow>` now reactively syncs `nodeTypes` and `edgeTypes` props into the
  store with `immediate: true`. Previously, when `<VueFlow>` reused a store
  provided by a `<VueFlowProvider>` ancestor (or when these props arrived
  asynchronously), custom node/edge components were silently replaced by the
  built-in `DefaultNode` / `BezierEdge` fallbacks — visually rendering only
  the source/target handles with an empty body. This matches the
  `StoreUpdater` semantics in `@xyflow/react`.

### Added
- Core renderer: `<VueFlow>` with controlled/uncontrolled modes, TS generics
- Built-in nodes: `input`, `output`, `default`, `group`
- Built-in edges: bezier, straight, step, smoothstep + `<BaseEdge>`
- Plugins: `<Background>`, `<Controls>`, `<MiniMap>`, `<NodeToolbar>`, `<EdgeToolbar>`, `<NodeResizer>`
- Utilities: `<Panel>`, `<ViewportPortal>`, `<VueFlowProvider>`, `<EdgeLabel>`, `<EdgeReconnectAnchor>`, `<Attribution>`, `<A11yDescriptions>`
- 14 composables (see README)
- 36 event emits with full parity to `@xyflow/svelte`
- Keyboard shortcuts: Delete, Ctrl+A, Ctrl+C/X/V, Escape, Shift multi-select
- Subflow containment via `parentId` + `extent: 'parent'`
- ColorMode (light/dark/system)
- 20 interactive examples with live iframe embed in docs
- VitePress docs site (getting-started, API reference, examples)
- Drop-in `applyNodeChanges` / `applyEdgeChanges` matching React Flow's API

### Known limitations
- Playwright E2E tests not yet ported from svelte-flow
- Dagre/elkjs layout integrations pending
- Undo/redo helper pending
- See [`EXAMPLES_BACKLOG.md`](./packages/vue/EXAMPLES_BACKLOG.md) for the remaining 55 examples
