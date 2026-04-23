# Updating Nodes

Mutate `data` imperatively from outside the node using `useVueFlow().updateNodeData(id, partialData)`.

<ExampleFrame slug="updating" />

```vue
<script setup lang="ts">
import { useVueFlow } from 'xyflow-vue';

const flow = useVueFlow();
let tick = 0;
const rename = () => flow.updateNodeData('1', { label: `updated #${++tick}` });
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <Panel position="top-right">
      <button @click="rename">update label</button>
    </Panel>
  </VueFlow>
</template>
```

Related helpers: `updateNode(id, patch)`, `updateEdge(id, patch)`, `addNodes([...])`, `deleteElements({ nodes, edges })`.
