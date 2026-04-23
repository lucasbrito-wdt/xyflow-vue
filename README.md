# @xyflow/vue

> **Vue 3 port of [xyflow](https://xyflow.com)** — the engine behind [React Flow](https://reactflow.dev) and [Svelte Flow](https://svelteflow.dev). Built by Lucas Brito on top of `@xyflow/system`.

[![npm](https://img.shields.io/npm/v/@xyflow/vue?style=flat-square)](https://www.npmjs.com/package/@xyflow/vue)
[![license](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-green?style=flat-square)](./CONTRIBUTING.md)

Build node-based editors, workflow builders, diagrams, and flow charts in Vue 3. Powered by the same `@xyflow/system` core that runs the React and Svelte ports — identical pan/zoom, drag, handle math, subflows, everything.

```bash
pnpm add @xyflow/vue
```

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, type Node, type Edge } from '@xyflow/vue';
import '@xyflow/vue/dist/style.css';

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'Hello' }, position: { x: 250, y: 25 } },
  { id: '2', data: { label: 'World' }, position: { x: 100, y: 125 } },
]);
const edges = ref<Edge[]>([{ id: 'e1-2', source: '1', target: '2' }]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view>
    <Background variant="dots" />
  </VueFlow>
</template>
```

## Status

**Alpha.** Feature-complete across the core surface. See [`PORT_PLAN.md`](./packages/vue/PORT_PLAN.md) for the per-file parity matrix against `@xyflow/svelte`.

## Comparison

| | `@xyflow/vue` (this) | `@vue-flow/core` (Braks) | `@xyflow/react` | `@xyflow/svelte` |
|---|---|---|---|---|
| Core engine | `@xyflow/system` | forked from React Flow v10 | `@xyflow/system` | `@xyflow/system` |
| Vue version | 3.5+ | 3.0+ | — | — |
| Subflows (v12 model) | ✅ | ⚠ limited | ✅ | ✅ |
| `NodeResizer` / `NodeToolbar` / `EdgeToolbar` | ✅ | partial | ✅ | ✅ |
| Events parity | 36 emits | 30+ | — | — |
| SSR-safe | ✅ | ✅ | N/A | ✅ |
| License | MIT | MIT | MIT | MIT |

`@vue-flow/core` is a respected project, but it diverged from the shared xyflow core years ago and misses v12 features. `@xyflow/vue` is built fresh on `@xyflow/system` so it stays in sync with the React/Svelte ports by default.

## Features

- **15 composables** — `useVueFlow`, `useNodes`, `useEdges`, `useNodeConnections`, `useViewport`, `useInternalNode`, `useUpdateNodeInternals`, `useConnection`, `useInitialized`, `useColorMode`, `useOnSelectionChange`, `useKeyboardShortcuts`, `useSelectionBox`, `useDrag`, `useStore`
- **12 components** — `<VueFlow>`, `<VueFlowProvider>`, `<Handle>`, `<Background>`, `<Controls>`, `<MiniMap>`, `<NodeToolbar>`, `<EdgeToolbar>`, `<NodeResizer>`, `<Panel>`, `<ViewportPortal>`, `<EdgeLabel>`, `<EdgeReconnectAnchor>`, `<Attribution>`
- **5 built-in edges** — bezier, straight, step, smoothstep + `<BaseEdge>`
- **4 built-in nodes** — input, output, default, group
- **Keyboard shortcuts** — Delete, Ctrl+A, Ctrl+C/X/V, Escape, Shift for multi-select
- **Drop-in change helpers** — `applyNodeChanges` / `applyEdgeChanges` (React Flow-compatible API)
- **20 live examples** — see [`examples/vue`](./examples/vue)
- **Full docs site** — see [`apps/docs`](./apps/docs)

## Repo layout

```
packages/vue/       — the @xyflow/vue library (published to npm)
examples/vue/       — Vite demo app with 20 interactive examples
apps/docs/          — VitePress documentation site
tooling/            — shared postcss config
```

## Development

```bash
pnpm install                 # install workspace deps
pnpm build                   # build @xyflow/vue
pnpm dev                     # run the examples app on :5173
pnpm docs:dev                # run the docs site on :5174
pnpm typecheck               # vue-tsc
```

## Roadmap

Shipped (M0–M4):
- ✅ Core renderer + pan/zoom
- ✅ Drag + connect + selection + keyboard
- ✅ All plugins (Background, Controls, MiniMap, NodeToolbar, EdgeToolbar, NodeResizer)
- ✅ All composables (15)
- ✅ Full emits parity (36 events)
- ✅ Copy/paste/cut
- ✅ Subflow containment
- ✅ ColorMode (light/dark/system)
- ✅ SSR-safe

Next (tracked in [`EXAMPLES_BACKLOG.md`](./packages/vue/EXAMPLES_BACKLOG.md)):
- ⏳ Playwright tests ported from svelte-flow fixtures
- ⏳ Dagre / elkjs layout integrations
- ⏳ Undo/redo helper
- ⏳ Floating edges + reconnect UX polish
- ⏳ Editable edges (control-point drag)

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). Issues welcome for bugs, API pain points, or feature requests — open one before a non-trivial PR.

## License

MIT © [Lucas Brito](https://github.com/lucasbrito-wdt).

The `@xyflow/system` dependency is maintained by xyflow GmbH and used under its MIT license.
