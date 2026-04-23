# Node Toolbar

A floating toolbar positioned above the selected node. Uses `<Teleport>` under the hood so it renders above the viewport transform and stays readable regardless of zoom.

<ExampleFrame slug="toolbar" />

```vue
<script setup lang="ts">
import { VueFlow, Background, NodeToolbar, Position } from '@xyflow/vue';
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <Background variant="dots" />
    <NodeToolbar :node-id="nodes[0].id" :position="Position.Top">
      <div style="background: #1a192b; padding: 6px 10px; border-radius: 4px">
        <button>delete</button>
        <button>rename</button>
      </div>
    </NodeToolbar>
  </VueFlow>
</template>
```

Inside a custom node, omit `nodeId` — the toolbar infers it from the injected context:

```vue
<NodeToolbar :position="Position.Top">
  <!-- controls for the current node -->
</NodeToolbar>
```
