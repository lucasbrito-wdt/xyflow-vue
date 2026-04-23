<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Position, type Node, type Edge } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'Input' }, position: { x: 0, y: 100 }, sourcePosition: Position.Right },
  { id: '2', data: { label: 'Step 1' }, position: { x: 200, y: 100 }, sourcePosition: Position.Right, targetPosition: Position.Left },
  { id: '3', data: { label: 'Step 2' }, position: { x: 400, y: 100 }, sourcePosition: Position.Right, targetPosition: Position.Left },
  { id: '4', type: 'output', data: { label: 'Output' }, position: { x: 600, y: 100 }, targetPosition: Position.Left },
]);
const edges = ref<Edge[]>([
  { id: '1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: '2-3', source: '2', target: '3', type: 'smoothstep' },
  { id: '3-4', source: '3', target: '4', type: 'smoothstep' },
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view>
    <Background variant="dots" />
  </VueFlow>
</template>
