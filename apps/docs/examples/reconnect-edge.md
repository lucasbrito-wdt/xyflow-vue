# Reconnect Edge

Select an edge, then drag either endpoint (blue circle) to re-anchor it to a different node. Powered by `<EdgeReconnectAnchor>` + `XYHandle.onPointerDown` with `edgeUpdaterType`.

<ExampleFrame slug="reconnect" />

The reconnect anchors show automatically when the edge is selected. Opt out per-edge with `reconnectable: false`:

```ts
const edges = [
  { id: 'a-b', source: 'a', target: 'b', reconnectable: false }, // fixed
  { id: 'a-c', source: 'a', target: 'c' },                        // reconnectable
];
```

## Under the hood

`<EdgeWrapper>` renders `<EdgeReconnectAnchor type="source">` and `<type="target">` at the edge endpoints when `edge.selected` is true. Each anchor calls `XYHandle.onPointerDown` with `edgeUpdaterType: 'source' | 'target'` — the fixed end stays anchored while the user drags from the other end. On a valid drop, the existing edge's `source`/`target` (and handles) are rewritten via `store.setEdges(...)` — **no new edge is created**, preserving the edge's `id`, `data`, styling and connections in connectionLookup.

If the drop lands outside any valid handle, the edge stays unchanged.
