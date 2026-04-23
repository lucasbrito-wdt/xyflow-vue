# Composables

All composables must be called inside a child of `<VueFlow>` or `<VueFlowProvider>`.

## `useVueFlow()`

Main helper with imperative actions. Returns an object:

| Method | Description |
|---|---|
| `getNodes() / getEdges()` | Read current arrays |
| `setNodes(n) / setEdges(e)` | Replace arrays |
| `addNodes(n) / addEdges(e)` | Append (single or array) |
| `getNode(id) / getEdge(id)` | Lookup by id (returns internal) |
| `updateNode(id, update, opts?)` | Shallow merge or replace |
| `updateEdge(id, update, opts?)` | Shallow merge or replace |
| `updateNodeData(id, data)` | Merge `data` only |
| `deleteElements({ nodes, edges })` | Remove + cascade edges |
| `getViewport() / setViewport(v)` | Read/write `{x,y,zoom}` |
| `fitView(options?)` | Fit all / subset |
| `fitBounds(rect, options?)` | Fit to rect |
| `setCenter(x, y, { zoom, duration })` | Center viewport |
| `zoomIn() / zoomOut() / zoomTo(z)` | Pan-zoom shortcuts |
| `screenToFlowPosition(xy)` | Client → flow coords |
| `flowToScreenPosition(xy)` | Flow → client coords |
| `getHandleConnections({ nodeId, type, handleId? })` | List connections for a handle |
| `getNodesBounds(nodes)` | Bounding box |
| `toObject()` | Snapshot `{ nodes, edges, viewport }` |

## Reactive accessors

```ts
const nodes = useNodes();     // ComputedRef<Node[]>
const edges = useEdges();     // ComputedRef<Edge[]>
const viewport = useViewport(); // ComputedRef<Viewport>
```

## `useInternalNode(id)`

Returns a `ComputedRef<InternalNode>` — node with `.internals.positionAbsolute`, `.internals.handleBounds`, `.measured`.

## `useUpdateNodeInternals()`

Returns a function to force re-measure a node's handles:

```ts
const update = useUpdateNodeInternals();
update('node-1'); // or update(['n1','n2'])
```

Call after adding/removing handles dynamically.

## `useNodeConnections(params?)`

```ts
const connections = useNodeConnections({
  id: 'node-1',        // defaults to current node (via inject)
  handleType: 'target', // 'source' | 'target'
  handleId: 'input-a',  // optional
});
// connections.value is reactive NodeConnection[]
```

## `useNodesData(idOrIds)`

Lightweight `{ id, type, data }` read — cheaper than `getNode` for UI that only needs data.

## `useConnection(selector?)`

```ts
const inProgress = useConnection((s) => s.inProgress);
const fromHandle = useConnection((s) => s.fromHandle);
```

## `useOnSelectionChange(cb)`

```ts
useOnSelectionChange(({ nodes, edges }) => {
  console.log('selected', nodes.length, 'nodes');
});
```

## `useStore()`

Low-level escape hatch. Returns the raw store with all `ref`s. **Prefer the targeted composables above** — direct store access bypasses reactivity memoization.

## `useColorMode(mode?)`

Returns `ComputedRef<'light' | 'dark'>` for the active mode. Usually wired via the `<VueFlow :color-mode>` prop — use this composable when you need a standalone reader.

## `useInitialized()`

`ComputedRef<boolean>` — true after all nodes are measured AND pan/zoom is ready. Useful for layout libraries that need final dimensions.

## Keyboard / selection (implicit)

- `useKeyboardShortcuts()` — wire Delete, Ctrl+A, Ctrl+C/X/V, Escape, Shift
- `useSelectionBox(paneRef)` — shift+drag rectangular selection

Both auto-registered inside `<VueFlow>`; you typically don't call them directly.
