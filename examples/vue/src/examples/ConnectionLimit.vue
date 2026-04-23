<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { VueFlow, Background, type Node, type Edge, type Connection } from '@xyflow/vue';
import LimitedNode from './LimitedNode.vue';

const nodeTypes = { limited: markRaw(LimitedNode) };

const nodes = ref<Node[]>([
  { id: 'a', data: { label: 'Source A' }, position: { x: 50, y: 50 } },
  { id: 'b', data: { label: 'Source B' }, position: { x: 50, y: 180 } },
  { id: 'c', data: { label: 'Source C' }, position: { x: 50, y: 310 } },
  { id: 'x', type: 'limited', data: { label: 'Max 2 inputs' }, position: { x: 400, y: 180 } },
]);
const edges = ref<Edge[]>([]);

function onConnect(c: Connection) {
  edges.value = [...edges.value, { id: `${c.source}-${c.target}`, ...c }];
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :node-types="nodeTypes" fit-view @connect="onConnect">
    <Background variant="dots" />
  </VueFlow>
</template>
