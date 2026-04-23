<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { VueFlow, Background, MarkerType, type Node, type Edge } from 'xyflow-vue';
import FloatingEdge from './FloatingEdge.vue';

const edgeTypes = { floating: markRaw(FloatingEdge) };

const nodes = ref<Node[]>([
  { id: '1', data: { label: 'Drag me' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'The edge follows' }, position: { x: 400, y: 200 } },
  { id: '3', data: { label: 'from any side' }, position: { x: 200, y: 400 } },
]);
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'floating', markerEnd: { type: MarkerType.ArrowClosed } as any },
  { id: 'e2-3', source: '2', target: '3', type: 'floating', markerEnd: { type: MarkerType.ArrowClosed } as any },
  { id: 'e3-1', source: '3', target: '1', type: 'floating', markerEnd: { type: MarkerType.ArrowClosed } as any },
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :edge-types="edgeTypes" fit-view>
    <Background variant="dots" />
  </VueFlow>
</template>
