# Save & Restore

Snapshot the current graph state (`nodes + edges + viewport`) into localStorage and reload it on demand.

<ExampleFrame slug="saveRestore" />

```vue
<script setup lang="ts">
import { useVueFlow } from '@xyflow/vue';
const flow = useVueFlow();

function save() {
  localStorage.setItem('flow', JSON.stringify(flow.toObject()));
}

function restore() {
  const raw = localStorage.getItem('flow');
  if (!raw) return;
  const d = JSON.parse(raw);
  flow.setNodes(d.nodes);
  flow.setEdges(d.edges);
  flow.setViewport(d.viewport);
}
</script>
```

`flow.toObject()` returns `{ nodes, edges, viewport }` — a deep-copyable snapshot you can persist anywhere (localStorage, IndexedDB, server, collaborative CRDT).
