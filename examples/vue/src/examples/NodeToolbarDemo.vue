<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, NodeToolbar, Position, type Node, type Edge } from '@xyflow/vue';

const nodes = ref<Node[]>([
  { id: '1', data: { label: 'Select me' }, position: { x: 200, y: 150 } },
  { id: '2', data: { label: 'Me too' }, position: { x: 400, y: 250 } },
]);
const edges = ref<Edge[]>([{ id: 'e', source: '1', target: '2' }]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view>
    <Background variant="dots" />
    <NodeToolbar :node-id="nodes[0].id" :position="Position.Top">
      <div style="background: #1a192b; padding: 6px 10px; border-radius: 4px; display: flex; gap: 6px">
        <button @click="nodes = nodes.filter(n => n.id !== '1')">delete</button>
        <button @click="(nodes[0].data as any).label = 'edited!'">rename</button>
      </div>
    </NodeToolbar>
  </VueFlow>
</template>
