<script setup lang="ts">
import { ref, markRaw } from 'vue';
import {
  VueFlow,
  Background,
  Controls,
  Handle,
  Position,
  type Node,
  type Edge,
} from 'xyflow-vue';
import ColorNode from './ColorNode.vue';

const nodeTypes = { color: markRaw(ColorNode) };

const nodes = ref<Node[]>([
  { id: '1', type: 'color', data: { color: '#ff6b6b' }, position: { x: 100, y: 100 } },
  { id: '2', type: 'color', data: { color: '#4ecdc4' }, position: { x: 350, y: 100 } },
  { id: '3', type: 'color', data: { color: '#ffe66d' }, position: { x: 225, y: 280 } },
]);

const edges = ref<Edge[]>([
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-3', source: '2', target: '3' },
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :node-types="nodeTypes" fit-view>
    <Background variant="dots" />
    <Controls />
  </VueFlow>
</template>
