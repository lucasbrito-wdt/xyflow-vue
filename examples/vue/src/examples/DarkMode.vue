<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Controls, Panel, type Node, type Edge } from 'xyflow-vue';

const mode = ref<'light' | 'dark' | 'system'>('dark');

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'Input' }, position: { x: 150, y: 25 } },
  { id: '2', data: { label: 'Default' }, position: { x: 150, y: 150 } },
  { id: '3', type: 'output', data: { label: 'Output' }, position: { x: 150, y: 275 } },
]);
const edges = ref<Edge[]>([
  { id: 'e1', source: '1', target: '2' },
  { id: 'e2', source: '2', target: '3', type: 'smoothstep' },
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :color-mode="mode" fit-view>
    <Background variant="dots" />
    <Controls />
    <Panel position="top-right">
      <select v-model="mode">
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="system">system</option>
      </select>
    </Panel>
  </VueFlow>
</template>
