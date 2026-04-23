<div align="center">

# xyflow-vue

**Vue 3 port of [xyflow](https://xyflow.com)** — the engine behind [React Flow](https://reactflow.dev) and [Svelte Flow](https://svelteflow.dev). Build node-based editors, flow charts, diagrams, and workflow tools.

[![npm](https://img.shields.io/npm/v/xyflow-vue?style=flat-square&color=42b883)](https://www.npmjs.com/package/xyflow-vue)
[![bundle](https://img.shields.io/bundlephobia/minzip/xyflow-vue?style=flat-square&color=42b883&label=gzip)](https://bundlephobia.com/package/xyflow-vue)
[![license](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-green?style=flat-square)](./CONTRIBUTING.md)

[Demo app](https://github.com/lucasbrito-wdt/xyflow-vue/tree/main/examples/vue) · [Docs](./apps/docs) · [Examples Backlog](./packages/vue/EXAMPLES_BACKLOG.md) · [React Flow](https://reactflow.dev) · [Svelte Flow](https://svelteflow.dev)

</div>

---

## The repo

This repo publishes three packages:

- **`xyflow-vue`** — [`packages/vue`](./packages/vue) — the core library, rendering + composables + plugins
- **`xyflow-vue-nuxt`** — [`packages/nuxt`](./packages/nuxt) — Nuxt 3/4 module with auto-imports + SSR defaults
- *(dev-only)* `apps/docs` — VitePress documentation site · `examples/vue` — 24 interactive demos

Built on top of `@xyflow/system`, the same shared core that powers the official React and Svelte ports — so pan/zoom, drag, handles, subflows and resize all match those libraries byte-for-byte. The Vue layer is an idiomatic adapter: Composition API, `<script setup>`, `shallowRef` for graph data, `provide`/`inject` for store, full TS generics.

## Getting started

<details open>
  <summary><strong>Plain Vue 3 / Vite</strong></summary>

```bash
pnpm add xyflow-vue
```

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Controls, type Node, type Edge, type Connection } from 'xyflow-vue';
import 'xyflow-vue/dist/style.css';

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'Input' }, position: { x: 250, y: 25 } },
  { id: '2', data: { label: 'Default' }, position: { x: 100, y: 125 } },
  { id: '3', type: 'output', data: { label: 'Output' }, position: { x: 250, y: 250 } },
]);

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
]);

function onConnect(c: Connection) {
  edges.value = [...edges.value, { id: `${c.source}-${c.target}`, ...c }];
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view @connect="onConnect">
    <Background variant="dots" />
    <Controls />
  </VueFlow>
</template>
```

</details>

<details>
  <summary><strong>Nuxt 3 / 4</strong></summary>

```bash
pnpm add xyflow-vue xyflow-vue-nuxt
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['xyflow-vue-nuxt'],
});
```

Components and composables are now auto-imported. Wrap in `<ClientOnly>` to skip SSR rendering:

```vue
<template>
  <ClientOnly>
    <VueFlow :nodes="nodes" :edges="edges" fit-view>
      <Background variant="dots" />
    </VueFlow>
  </ClientOnly>
</template>

<script setup lang="ts">
const nodes = ref([{ id: '1', data: { label: 'Hello' }, position: { x: 0, y: 0 } }]);
const edges = ref([]);
</script>
```

</details>

Full walkthrough: [`apps/docs/guide/getting-started.md`](./apps/docs/guide/getting-started.md) · live examples: `pnpm dev`.

## What's in the box

| | |
|---|---|
| **12 components** | `<VueFlow>` · `<VueFlowProvider>` · `<Handle>` · `<Background>` · `<Controls>` · `<MiniMap>` · `<NodeToolbar>` · `<EdgeToolbar>` · `<NodeResizer>` · `<Panel>` · `<ViewportPortal>` · `<EdgeLabel>` · `<EdgeReconnectAnchor>` · `<Attribution>` |
| **17 composables** | `useVueFlow` · `useNodes` · `useEdges` · `useViewport` · `useNodeConnections` · `useInternalNode` · `useUpdateNodeInternals` · `useConnection` · `useInitialized` · `useColorMode` · `useOnSelectionChange` · `useKeyboardShortcuts` · `useSelectionBox` · `useDrag` · `useUndoRedo` · `useNodesData` · `useStore` |
| **9 built-in node/edge types** | `input` · `default` · `output` · `group` · `BezierEdge` · `StraightEdge` · `StepEdge` · `SmoothStepEdge` · `BaseEdge` |
| **36 events** | drag, connect, move, pane, selection, node, edge, reconnect, delete, init, error |
| **Shortcuts** | Delete/Backspace · Ctrl+A · Ctrl+C/X/V · Escape · Shift (multi-select) · Ctrl+Z / Ctrl+Shift+Z (via `useUndoRedo`) |
| **Utilities** | `applyNodeChanges` · `applyEdgeChanges` · `addEdge` · `getBezierPath` · `getSmoothStepPath` · `getStraightPath` · `getNodesBounds` · `getIncomers` · `getOutgoers` · `getConnectedEdges` · `getViewportForBounds` |

## Comparison

|  | `xyflow-vue` | `@vue-flow/core` (Braks) | `@xyflow/react` | `@xyflow/svelte` |
|---|---|---|---|---|
| Engine | `@xyflow/system` | forked from React Flow v10 | `@xyflow/system` | `@xyflow/system` |
| Vue version | **3.5+** | 3.0+ | — | — |
| Subflows (v12 model) | ✅ | ⚠ limited | ✅ | ✅ |
| `NodeResizer` / `NodeToolbar` / `EdgeToolbar` | ✅ | partial | ✅ | ✅ |
| Event parity | **36 emits** | 30+ | — | — |
| Nuxt module | ✅ `xyflow-vue-nuxt` | ❌ | — | — |
| SSR-safe | ✅ | ✅ | N/A | ✅ |
| License | MIT | MIT | MIT | MIT |

`@vue-flow/core` is a respected community project, but it diverged from the shared xyflow core years ago and misses v12 features. `xyflow-vue` is a fresh port built directly on `@xyflow/system` so it stays in sync with React Flow / Svelte Flow by default.

## Development

```bash
git clone https://github.com/lucasbrito-wdt/xyflow-vue
cd xyflow-vue
pnpm install
pnpm build                   # build xyflow-vue (required once so examples resolve it)
pnpm dev                     # examples app → http://localhost:5173
pnpm docs:dev                # VitePress docs → http://localhost:5174
pnpm typecheck               # vue-tsc
pnpm audit:bundle            # tree-shake audit (5 scenarios)
```

Repo layout:

```
packages/vue/       — xyflow-vue library (published to npm)
packages/nuxt/      — xyflow-vue-nuxt module (published to npm)
apps/docs/          — VitePress docs site
examples/vue/       — Vite app with 24 interactive demos
tooling/            — shared postcss config
scripts/            — bundle audit
```

## Releases

Versioning + publishing via [changesets](https://github.com/changesets/changesets):

1. PR with your change + `pnpm changeset`
2. merge to `main`
3. the GitHub Action opens a release PR that bumps versions
4. merge the release PR → `pnpm release` publishes to npm

## Contributing

Issues welcome for bugs, DX complaints, or feature requests — open one before a non-trivial PR. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for setup and style.

## Roadmap

Shipped in M0–M4+: core renderer, drag/connect/pan/zoom, subflow containment, all plugins, 17 composables, 36 emits, keyboard shortcuts, copy/paste/cut, color mode, SSR-safe, Undo/Redo, Dagre layout, floating & editable edges, reconnect UX, Nuxt module. See [`EXAMPLES_BACKLOG.md`](./packages/vue/EXAMPLES_BACKLOG.md) for the remaining ~46 examples tagged by complexity and ROI.

## License

MIT © [Lucas Brito](https://github.com/lucasbrito-wdt)

The `@xyflow/system` package this depends on is maintained by xyflow GmbH and used under its MIT license.
