<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, MarkerType, type Node, type Edge } from '@xyflow/vue';

const nodes = ref<Node[]>([
  { id: '1', data: { label: 'Source' }, position: { x: 50, y: 25 } },
  { id: '2', data: { label: 'Arrow' }, position: { x: 250, y: 25 } },
  { id: '3', data: { label: 'ArrowClosed' }, position: { x: 250, y: 125 } },
  { id: '4', data: { label: 'Both ends' }, position: { x: 250, y: 225 } },
]);
const edges = ref<Edge[]>([
  { id: 'a', source: '1', target: '2', markerEnd: { type: MarkerType.Arrow } },
  { id: 'b', source: '1', target: '3', markerEnd: { type: MarkerType.ArrowClosed, color: '#ff6b6b' }, style: { stroke: '#ff6b6b' } },
  { id: 'c', source: '1', target: '4', markerStart: { type: MarkerType.ArrowClosed }, markerEnd: { type: MarkerType.ArrowClosed } },
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view>
    <Background variant="dots" />
  </VueFlow>
</template>
