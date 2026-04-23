# Your first flow

Let's build a small editable flow with save/load and custom nodes.

## 1 — Controlled vs uncontrolled

```vue
<!-- controlled (you own the state) -->
<VueFlow :nodes="nodes" :edges="edges" @nodes-change="onNodesChange" />

<!-- uncontrolled (VueFlow owns the state) -->
<VueFlow :default-nodes="[...]" :default-edges="[...]" />
```

In controlled mode, wire the changes:

```ts
import { applyNodeChanges, applyEdgeChanges } from 'xyflow-vue';

function onNodesChange(changes) { nodes.value = applyNodeChanges(changes, nodes.value); }
function onEdgesChange(changes) { edges.value = applyEdgeChanges(changes, edges.value); }
```

## 2 — Add plugins

```vue
<VueFlow :nodes="nodes" :edges="edges" fit-view>
  <Background variant="dots" />
  <Controls />
  <MiniMap />
</VueFlow>
```

All plugins are **slot children** of `<VueFlow>` — they have access to the store via `inject`.

## 3 — Handle connections

```vue
<VueFlow
  :nodes="nodes"
  :edges="edges"
  @connect="(c) => edges = [...edges, { id: `${c.source}-${c.target}`, ...c }]"
/>
```

Or use the helper:

```ts
import { addEdge } from 'xyflow-vue';
function onConnect(c) { edges.value = addEdge(c, edges.value); }
```

## 4 — Save & restore

```ts
import { useVueFlow } from 'xyflow-vue';
const flow = useVueFlow();

function save() { localStorage.setItem('flow', JSON.stringify(flow.toObject())); }
function load() {
  const d = JSON.parse(localStorage.getItem('flow')!);
  nodes.value = d.nodes;
  edges.value = d.edges;
  flow.setViewport(d.viewport);
}
```

`useVueFlow()` **must be called inside a child of `<VueFlow>`** or inside `<VueFlowProvider>`. It throws if called in the same setup as where `<VueFlow>` is declared.

Next: **[Custom nodes →](./custom-nodes)**
