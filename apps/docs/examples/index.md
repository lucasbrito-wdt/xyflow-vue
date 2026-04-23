# Examples

Live, interactive demos of `@xyflow/vue` features. Each page embeds the running example and shows the source code — you can copy/paste and adapt.

> **Run locally:** `pnpm --filter vue-examples dev` — open the `?demo=<slug>` URL shown on each page.

## Basics
- [Feature Overview](./overview) — a simple flow with built-in node types and plugins
- [Custom Node](./custom) — build nodes with arbitrary Vue templates
- [Drag & Drop](./dnd) — drop HTML elements into the canvas to create nodes
- [Events Log](./events) — observe every emit as you interact
- [Updating Nodes](./updating) — mutate node data imperatively
- [Save & Restore](./save-restore) — persist + load via localStorage

## Nodes
- [Node Toolbar](./node-toolbar) — contextual toolbar above a node
- [Node Resizer](./node-resizer) — drag corners/edges to resize
- [Delete Middle Node](./delete-middle) — remove a node and auto-reconnect neighbors
- [Subflow](./subflow) — nested group with contained children
- [Stress Test](./stress) — 500 nodes / 499 edges

## Edges
- [Edge Types](./edge-types) — bezier, straight, step, smoothstep
- [Edge Markers](./edge-markers) — arrows, arrow-closed, double-ended

## Interaction
- [Validation](./validation) — restrict connections with `isValidConnection`
- [Add Node On Edge Drop](./add-on-drop) — create a node where the user drops the connection line
- [Context Menu](./context-menu) — right-click a node for actions
- [Connection Limit](./connection-limit) — cap handles at N connections via `useNodeConnections`
- [Preventing Cycles](./cycles) — reject connections that would create cycles

## Layout
- [Horizontal Flow](./horizontal) — left-to-right with explicit handle positions

## Styling
- [Dark Mode](./dark) — light/dark/system theme switch
