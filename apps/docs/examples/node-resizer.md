# Node Resizer

Drag the corners or edges of a node to resize. Backed by `XYResizer` from `@xyflow/system` — same math as react-flow and svelte-flow.

<ExampleFrame slug="resizer" />

```vue
<!-- ResizableNode.vue -->
<script setup lang="ts">
import { Handle, Position, NodeResizer } from '@xyflow/vue';
defineProps<{ data: { label: string }; selected?: boolean }>();
</script>

<template>
  <div style="width: 100%; height: 100%; border: 1px solid #bbb; padding: 12px">
    <NodeResizer color="#3578e5" :is-visible="selected" :min-width="100" :min-height="60" />
    <Handle type="target" :position="Position.Top" />
    {{ data.label }}
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
```

Key props:
- `isVisible` — gate on selection, hover, etc.
- `minWidth` / `minHeight` / `maxWidth` / `maxHeight`
- `keepAspectRatio`
- `shouldResize(event, params)` → `boolean` — per-resize guard
