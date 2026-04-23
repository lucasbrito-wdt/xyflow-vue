<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, type Node, type Edge } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: 'a', data: { label: 'A' }, position: { x: 100, y: 100 } },
  { id: 'b', data: { label: 'B' }, position: { x: 400, y: 50 } },
  { id: 'c', data: { label: 'C' }, position: { x: 400, y: 180 } },
  { id: 'd', data: { label: 'D' }, position: { x: 700, y: 120 } },
]);

const edges = ref<Edge[]>([
  { id: 'a-b', source: 'a', target: 'b' },
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view>
    <Background variant="dots" />
  </VueFlow>
  <div style="position: absolute; top: 10px; right: 10px; background: white; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px">
    Click the edge to select it. Drag either blue circle endpoint to reconnect to a different node.
  </div>
</template>
