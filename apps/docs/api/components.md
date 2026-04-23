# Components

## `<VueFlow>`

The main container. Must be inside a sized parent.

### Props

| Prop | Type | Default |
|---|---|---|
| `nodes` | `Node[]` | — |
| `edges` | `Edge[]` | — |
| `defaultNodes` | `Node[]` | `[]` |
| `defaultEdges` | `Edge[]` | `[]` |
| `nodeTypes` | `Record<string, Component>` | built-in |
| `edgeTypes` | `Record<string, Component>` | built-in |
| `nodeOrigin` | `[number, number]` | `[0, 0]` |
| `nodeExtent` | `CoordinateExtent` | infinite |
| `translateExtent` | `CoordinateExtent` | infinite |
| `minZoom` | `number` | `0.5` |
| `maxZoom` | `number` | `2` |
| `defaultViewport` | `Viewport` | `{ x:0, y:0, zoom:1 }` |
| `fitView` | `boolean` | `false` |
| `fitViewOptions` | `FitViewOptions` | — |
| `snapGrid` | `[number, number]` | — |
| `snapToGrid` | `boolean` | `false` |
| `connectionMode` | `'strict' \| 'loose'` | `'strict'` |
| `colorMode` | `'light' \| 'dark' \| 'system'` | `'light'` |
| `nodesDraggable` | `boolean` | `true` |
| `nodesConnectable` | `boolean` | `true` |
| `elementsSelectable` | `boolean` | `true` |
| `selectNodesOnDrag` | `boolean` | `true` |
| `autoPanOnNodeDrag` | `boolean` | `true` |
| `autoPanOnConnect` | `boolean` | `true` |
| `isValidConnection` | `(c: Connection) => boolean` | — |

### Events

See **[Events →](./events)**.

---

## `<Handle>`

A connection anchor. Must live inside a custom node's template.

```vue
<Handle type="source" :position="Position.Bottom" />
<Handle type="target" :position="Position.Top" id="input-a" />
```

| Prop | Type | Default |
|---|---|---|
| `type` | `'source' \| 'target'` | `'source'` |
| `position` | `Position` | `Position.Top` |
| `id` | `string` | — |
| `isConnectable` | `boolean` | from node |
| `isConnectableStart` | `boolean` | `true` |
| `isConnectableEnd` | `boolean` | `true` |
| `isValidConnection` | `(c) => boolean` | — |

Events: `@connect`, `@disconnect`.

---

## `<Background>`

| Prop | Type | Default |
|---|---|---|
| `variant` | `'dots' \| 'lines' \| 'cross'` | `'dots'` |
| `gap` | `number \| [number, number]` | `20` |
| `size` | `number` | `1` (dots) |
| `color` | `string` | theme |
| `bgColor` | `string` | — |

---

## `<Controls>`

Zoom/fit/lock buttons.

| Prop | Default |
|---|---|
| `position` | `'bottom-left'` |
| `orientation` | `'vertical'` |
| `showZoom` / `showFitView` / `showLock` | `true` |

Events: `@zoom-in`, `@zoom-out`, `@fit-view`, `@interactive-change`.

---

## `<MiniMap>`

| Prop | Type | Default |
|---|---|---|
| `position` | `PanelPosition` | `'bottom-right'` |
| `width` / `height` | `number` | `200` / `150` |
| `pannable` / `zoomable` | `boolean` | `false` |
| `nodeColor` | `string \| (n) => string` | `#e2e2e2` |
| `nodeStrokeColor` | `string \| (n) => string` | — |
| `maskColor` | `string` | `rgba(240,240,240,0.6)` |

---

## `<NodeToolbar>`

Teleports content above a node. Use inside a custom node (inherits `nodeId` via inject) or pass `nodeId` explicitly.

| Prop | Default |
|---|---|
| `nodeId` | context nodeId |
| `position` | `Position.Top` |
| `align` | `'center'` |
| `offset` | `10` |
| `isVisible` | `auto` (selected && single) |

---

## `<EdgeToolbar>`

Teleports above an edge centerpoint.

| Prop | Default |
|---|---|
| `edgeId` | required |
| `isVisible` | `selected` |
| `offset` | `10` |

---

## `<NodeResizer>`

Wraps a node with 4 handle corners + 4 edge lines. Uses `XYResizer`.

| Prop | Default |
|---|---|
| `nodeId` | context nodeId |
| `isVisible` | `true` |
| `minWidth` / `minHeight` | `10` |
| `maxWidth` / `maxHeight` | `∞` |
| `keepAspectRatio` | `false` |
| `color` | theme |

---

## `<VueFlowProvider>`

Provides a standalone store — use when you want composables outside `<VueFlow>`.

```vue
<VueFlowProvider>
  <Sidebar />    <!-- can call useVueFlow() -->
  <VueFlow ... />
</VueFlowProvider>
```

---

## `<Panel>`

Positioned overlay anchored to the VueFlow root.

| Prop | Default |
|---|---|
| `position` | `'top-left'` |

---

## `<ViewportPortal>`

Teleports content into the pan/zoom-transformed viewport.

```vue
<ViewportPortal>
  <div style="position: absolute; left: 100px; top: 200px">
    I pan/zoom with the flow
  </div>
</ViewportPortal>
```

---

## `<EdgeLabel>` / `<EdgeReconnectAnchor>` / `<Attribution>`

Smaller utilities — see source for props.
