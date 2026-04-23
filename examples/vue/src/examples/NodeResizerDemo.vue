<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { VueFlow, Background, Controls, type Node, type Edge } from '@xyflow/vue';
import ResizableNode from './ResizableNode.vue';

const nodeTypes = { resizable: markRaw(ResizableNode) };

const nodes = ref<Node[]>([
  { id: '1', type: 'resizable', data: { label: 'Drag corners to resize' }, position: { x: 100, y: 100 }, width: 180, height: 100 },
]);
const edges = ref<Edge[]>([]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :node-types="nodeTypes" fit-view>
    <Background variant="dots" />
    <Controls />
  </VueFlow>
</template>
