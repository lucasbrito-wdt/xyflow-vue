# State management

## The store

Internally Vue Flow uses a custom store built with `shallowRef` + `provide`/`inject`. You usually don't touch it directly — instead use **composables**.

## Single-source-of-truth patterns

**Option A — controlled (recommended for forms, persistence):**

```ts
const nodes = ref<Node[]>([...]);
const edges = ref<Edge[]>([...]);

function onNodesChange(changes) { nodes.value = applyNodeChanges(changes, nodes.value); }
function onEdgesChange(changes) { edges.value = applyEdgeChanges(changes, edges.value); }
```

```vue
<VueFlow
  :nodes="nodes"
  :edges="edges"
  @nodes-change="onNodesChange"
  @edges-change="onEdgesChange"
/>
```

**Option B — uncontrolled (Vue Flow owns the state):**

```vue
<VueFlow :default-nodes="[...]" :default-edges="[...]" />
```

Use composables to reach in:

```ts
const flow = useVueFlow();
flow.setNodes([...]);
flow.addEdges([edge]);
```

## Accessing from deep children

Any child of `<VueFlow>` can call composables. For state that lives *outside* VueFlow (siblings, top-level app), wrap in `<VueFlowProvider>`:

```vue
<template>
  <VueFlowProvider>
    <SidebarControls />
    <VueFlow :default-nodes="..." />
  </VueFlowProvider>
</template>
```

Now `SidebarControls` can call `useVueFlow()`.

## Pinia / global state

If you already manage nodes in Pinia, use Option A (controlled) and drive VueFlow from the store:

```ts
const store = useFlowStore();

function onNodesChange(changes) { store.nodes = applyNodeChanges(changes, store.nodes); }
```

Don't mix Pinia *and* `useVueFlow().setNodes()` — pick one as source of truth.

Next: **[Theming →](./theming)**
