<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, type Node, type Edge } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: 'a1', data: { label: 'A' }, position: { x: 50, y: 0 } },
  { id: 'b1', data: { label: 'B (default/bezier)' }, position: { x: 50, y: 120 } },
  { id: 'a2', data: { label: 'A' }, position: { x: 350, y: 0 } },
  { id: 'b2', data: { label: 'B (straight)' }, position: { x: 350, y: 120 } },
  { id: 'a3', data: { label: 'A' }, position: { x: 50, y: 280 } },
  { id: 'b3', data: { label: 'B (step)' }, position: { x: 250, y: 280 } },
  { id: 'a4', data: { label: 'A' }, position: { x: 350, y: 280 } },
  { id: 'b4', data: { label: 'B (smoothstep)' }, position: { x: 550, y: 280 } },
]);
const edges = ref<Edge[]>([
  { id: '1', source: 'a1', target: 'b1' },
  { id: '2', source: 'a2', target: 'b2', type: 'straight' },
  { id: '3', source: 'a3', target: 'b3', type: 'step' },
  { id: '4', source: 'a4', target: 'b4', type: 'smoothstep' },
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view>
    <Background variant="dots" />
  </VueFlow>
</template>
