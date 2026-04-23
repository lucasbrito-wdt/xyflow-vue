<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, type Node, type Edge, type Connection } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: 'a', type: 'input', data: { label: 'A' }, position: { x: 100, y: 50 } },
  { id: 'b', data: { label: 'B (connects only from A)' }, position: { x: 100, y: 180 } },
  { id: 'c', data: { label: 'C (rejected)' }, position: { x: 400, y: 50 } },
]);
const edges = ref<Edge[]>([]);

// Only allow A → B
const isValidConnection = (c: Connection) => c.source === 'a' && c.target === 'b';

function onConnect(c: Connection) {
  edges.value = [...edges.value, { id: `${c.source}-${c.target}`, ...c }];
}
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :is-valid-connection="isValidConnection"
    fit-view
    @connect="onConnect"
  >
    <Background variant="dots" />
  </VueFlow>
  <div style="position: absolute; top: 10px; right: 10px; background: white; padding: 8px; border: 1px solid #ddd; font-size: 12px; border-radius: 4px">
    Try connecting: only <b>A → B</b> is allowed
  </div>
</template>
