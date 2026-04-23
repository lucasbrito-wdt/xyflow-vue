# Introduction

`xyflow-vue` is the **official Vue 3 port of xyflow** — the shared engine behind [React Flow](https://reactflow.dev) and [Svelte Flow](https://svelteflow.dev). It lets you build node-based editors, workflow builders, diagrams, and flow charts.

## Why Vue Flow?

- **Same engine as React / Svelte Flow.** All rendering math (pan, zoom, drag, handles, resize) comes from `@xyflow/system` — the React and Svelte libraries are just adapters. Vue Flow is another adapter.
- **Typed, tree-shakable, Vite-ready.** Full TS generics on `<VueFlow>`, built with `vite-plugin-vue`. Ship only what you use.
- **Feature-parity with Svelte Flow.** Controls, MiniMap, NodeToolbar, EdgeToolbar, NodeResizer, ViewportPortal — all available.

## When to use it

- Visual workflow editors (no-code builders, automation tools)
- Diagram and flow chart tools
- Mind-map and knowledge-graph visualizations
- ETL / data pipeline designers
- Electronic circuit layouts

## When NOT to use it

- Pure read-only graph visualization with thousands of nodes. For that look at `vis.js`, `cytoscape`, or `d3-force` — they're optimized for scale over interaction.
- Static flow charts with no edit capability — a Mermaid diagram is cheaper.

Next: **[Installation →](./getting-started)**
