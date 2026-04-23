# Feature Overview

A baseline flow demonstrating built-in node types (`input`, `default`, `output`), built-in edge types (`default`, `smoothstep`), and the three core plugins (`Background`, `Controls`, `MiniMap`).

<ExampleFrame slug="overview" />

## Source

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Controls, MiniMap, type Node, type Edge } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'Input' }, position: { x: 250, y: 25 } },
  { id: '2', data: { label: 'Default' }, position: { x: 100, y: 125 } },
  { id: '3', type: 'output', data: { label: 'Output' }, position: { x: 250, y: 250 } },
]);

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
]);

function onConnect(c: any) {
  edges.value = [...edges.value, { id: `e${c.source}-${c.target}-${Date.now()}`, ...c }];
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view @connect="onConnect">
    <Background variant="dots" />
    <Controls />
    <MiniMap />
  </VueFlow>
</template>
```
