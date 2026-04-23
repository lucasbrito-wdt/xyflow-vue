<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Controls, type Node, type Edge } from 'xyflow-vue';
import UndoRedoPanel from './UndoRedoPanel.vue';

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'Drag me' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Change me' }, position: { x: 300, y: 200 } },
]);
const edges = ref<Edge[]>([{ id: 'e', source: '1', target: '2' }]);
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges" fit-view>
    <Background variant="dots" />
    <Controls />
    <UndoRedoPanel />
  </VueFlow>
</template>
