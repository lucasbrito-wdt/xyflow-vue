# Events Log

Every event emitted by `<VueFlow>` — useful when debugging interactions or building abstractions on top of the library.

<ExampleFrame slug="events" />

```vue
<VueFlow
  :nodes="nodes"
  :edges="edges"
  @init="push('init')"
  @node-click="(_, n) => push(`nodeClick ${n.id}`)"
  @node-drag-start="(_, n) => push(`dragStart ${n.id}`)"
  @node-drag-stop="(_, n) => push(`dragStop ${n.id}`)"
  @edge-click="(_, e) => push(`edgeClick ${e.id}`)"
  @pane-click="push('paneClick')"
  @move-end="(_, v) => push(`moveEnd zoom=${v.zoom.toFixed(2)}`)"
  @connect="(c) => push(`connect ${c.source}→${c.target}`)"
  @selection-change="(p) => push(`selChange n=${p.nodes.length}`)"
/>
```

See the full [Events reference](../api/events) for all 36 emits.
