# xyflow-vue

> **Status: alpha (0.1.0-alpha.0)** — Vue 3 port of [xyflow](https://xyflow.com). API is stable; behavior matches `@xyflow/svelte` and `@xyflow/react` except where noted in [`PORT_PLAN.md`](./PORT_PLAN.md).

Vue Flow is a highly customizable Vue 3 library for building node-based editors, workflow systems, and diagrams. Built on top of `@xyflow/system` — the same core that powers React Flow and Svelte Flow.

## Install

```bash
pnpm add xyflow-vue
# or
npm install xyflow-vue
```

Peer dep: `vue ^3.5.0`.

## Quick start

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Controls, MiniMap, type Node, type Edge } from 'xyflow-vue';
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

function onConnect(c) {
  edges.value = [...edges.value, { id: `e${c.source}-${c.target}`, ...c }];
}
</script>

<template>
  <div style="width: 100%; height: 100vh">
    <VueFlow :nodes="nodes" :edges="edges" fit-view @connect="onConnect">
      <Background variant="dots" />
      <Controls />
      <MiniMap />
    </VueFlow>
  </div>
</template>
```

## Custom nodes

> **Tip:** declare props inline. `defineProps<NodeProps>()` can hit "Maximum call stack size exceeded" in Vue's SFC type resolver because of the deep generics in `@xyflow/system`. Inline types compile cleanly.

```vue
<script setup lang="ts">
import { Handle, Position } from 'xyflow-vue';

defineProps<{
  id: string;
  data: { label: string };
  selected?: boolean;
  sourcePosition?: Position;
  targetPosition?: Position;
  isConnectable?: boolean;
}>();
</script>

<template>
  <div style="padding: 10px; border: 1px solid #777; background: white">
    <Handle type="target" :position="Position.Top" />
    <strong>{{ data.label }}</strong>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
```

```ts
import MyNode from './MyNode.vue';
const nodeTypes = { myNode: MyNode };
```

```vue
<VueFlow :nodes="nodes" :edges="edges" :node-types="nodeTypes" />
```

## Composables

| Composable | Purpose |
|---|---|
| `useVueFlow()` | main helper: getNodes/setNodes, fitView, setCenter, zoomIn/Out, screenToFlowPosition, toObject, updateNode/Edge/NodeData, deleteElements, getHandleConnections |
| `useNodes() / useEdges() / useViewport()` | reactive accessors |
| `useStore()` | low-level store access |
| `useInternalNode(id)` | internal node with measured bounds |
| `useNodeConnections({ id?, handleType?, handleId? })` | reactive connections list |
| `useNodesData(id \| id[])` | lightweight `{ id, type, data }` for selected ids |
| `useConnection(selector?)` | in-progress connection state |
| `useUpdateNodeInternals()` | force recompute of handle bounds |
| `useOnSelectionChange(cb)` | selection change listener |
| `useColorMode('light' \| 'dark' \| 'system')` | color mode class resolver |
| `useInitialized()` | `true` when nodes measured + pan/zoom ready |
| `useKeyboardShortcuts()` | Delete, Ctrl+A, Escape, Shift (multi-select) |
| `useSelectionBox(paneRef)` | Shift+drag rectangular selection |

## Components

| Component | Purpose |
|---|---|
| `<VueFlow>` | main container |
| `<VueFlowProvider>` | standalone store provider (use outside `<VueFlow>`) |
| `<Handle>` | connection anchor inside custom nodes |
| `<Background>` | dots / lines / cross pattern |
| `<Controls>` | zoom / fit / interactive toggle |
| `<MiniMap>` | minimap with pan/zoom interaction |
| `<NodeToolbar>` | contextual toolbar above selected node (Teleport) |
| `<EdgeToolbar>` | contextual toolbar at edge center (Teleport) |
| `<NodeResizer>` | drag-to-resize handles around node |
| `<Panel>` | positioned overlay |
| `<ViewportPortal>` | Teleport children into viewport coord space |
| `<EdgeLabel>` | label positioned at edge |
| `<EdgeReconnectAnchor>` | draggable anchor to reconnect an edge |
| `<Attribution>` | attribution badge |
| Edges: `<BezierEdge>`, `<SmoothStepEdge>`, `<StepEdge>`, `<StraightEdge>`, `<BaseEdge>` | built-in edge types |

## Events

`<VueFlow>` emits (full parity with svelte/react):

- Connection: `connect`, `connectStart`, `connectEnd`
- Pane: `paneClick`, `paneContextMenu`, `paneMouseEnter/Move/Leave`
- Viewport: `move`, `moveStart`, `moveEnd`
- Node: `nodeClick`, `nodeDoubleClick`, `nodeContextMenu`, `nodeMouseEnter/Move/Leave`, `nodeDragStart`, `nodeDrag`, `nodeDragStop`
- Edge: `edgeClick`, `edgeDoubleClick`, `edgeContextMenu`, `edgeMouseEnter/Move/Leave`
- Selection: `selectionDragStart`, `selectionDrag`, `selectionDragStop`, `selectionContextMenu`, `selectionStart`, `selectionEnd`, `selectionChange`
- Meta: `init`, `error`, `nodesChange`, `edgesChange`, `update:nodes`, `update:edges`

## Parity with `@xyflow/svelte` / `@xyflow/react`

See [`PORT_PLAN.md`](./PORT_PLAN.md) for the detailed per-file mapping and status. Summary:

- ✅ Core renderer: nodes, edges, handles, pan/zoom, Background, built-in types
- ✅ Interaction: drag, connect, click-select, selection box, keyboard shortcuts, edge reconnect
- ✅ Plugins: Controls, MiniMap, NodeToolbar, EdgeToolbar, NodeResizer
- ✅ Composables: full set (14)
- 🟡 ColorMode, A11yDescriptions (basic shell)
- 🟡 Subflow containment drag (positioning ok via `adoptUserNodes`, full drag containment pending)
- ✅ Copy/paste/cut shortcuts (Ctrl+C/X/V with offset)
- ✅ Full event emits parity
- ❌ Playwright tests
- ❌ SSR (Nuxt) validated

## License

MIT
