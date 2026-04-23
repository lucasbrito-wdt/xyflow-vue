# Events

All events emitted by `<VueFlow>`.

## Graph changes

| Event | Signature | When |
|---|---|---|
| `nodesChange` | `(changes: NodeChange[])` | Node position/selection/dimensions change |
| `edgesChange` | `(changes: EdgeChange[])` | Edge select/remove |
| `update:nodes` | `(nodes: Node[])` | v-model for `:nodes` |
| `update:edges` | `(edges: Edge[])` | v-model for `:edges` |

Pair with `applyNodeChanges` / `applyEdgeChanges`:

```ts
<VueFlow
  :nodes="nodes"
  :edges="edges"
  @nodes-change="(c) => nodes = applyNodeChanges(c, nodes)"
  @edges-change="(c) => edges = applyEdgeChanges(c, edges)"
/>
```

## Connection lifecycle

| Event | Signature |
|---|---|
| `connect` | `(connection: Connection)` |
| `connectStart` | `(event, { nodeId, handleId, handleType })` |
| `connectEnd` | `(event)` |

## Viewport

| Event | Signature |
|---|---|
| `move` | `(event, viewport)` |
| `moveStart` | `(event, viewport)` |
| `moveEnd` | `(event, viewport)` |

## Pane

| Event | Signature |
|---|---|
| `paneClick` | `(event)` |
| `paneContextMenu` | `(event)` |
| `paneMouseEnter` / `paneMouseMove` / `paneMouseLeave` | `(event)` |

## Nodes

| Event | Signature |
|---|---|
| `nodeClick` / `nodeDoubleClick` / `nodeContextMenu` | `(event, node)` |
| `nodeMouseEnter` / `nodeMouseMove` / `nodeMouseLeave` | `(event, node)` |
| `nodeDragStart` / `nodeDrag` / `nodeDragStop` | `(event, node, nodes)` |

## Edges

| Event | Signature |
|---|---|
| `edgeClick` / `edgeDoubleClick` / `edgeContextMenu` | `(event, edge)` |
| `edgeMouseEnter` / `edgeMouseMove` / `edgeMouseLeave` | `(event, edge)` |

## Selection

| Event | Signature |
|---|---|
| `selectionChange` | `({ nodes, edges })` |
| `selectionDragStart` / `selectionDrag` / `selectionDragStop` | `(event, nodes)` |
| `selectionContextMenu` | `(event, nodes)` |
| `selectionStart` / `selectionEnd` | `(event)` |

## Meta

| Event | Signature |
|---|---|
| `init` | `()` — fires after first mount + pan/zoom ready |
| `error` | `(code, message)` |
