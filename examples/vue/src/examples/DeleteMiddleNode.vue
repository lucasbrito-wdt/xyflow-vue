<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Panel, type Node, type Edge, getIncomers, getOutgoers } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: 'a', type: 'input', data: { label: 'A' }, position: { x: 100, y: 50 } },
  { id: 'b', data: { label: 'B (middle)' }, position: { x: 100, y: 180 } },
  { id: 'c', type: 'output', data: { label: 'C' }, position: { x: 100, y: 310 } },
]);
const edges = ref<Edge[]>([
  { id: 'ab', source: 'a', target: 'b' },
  { id: 'bc', source: 'b', target: 'c' },
]);

function deleteMiddle() {
  const middle = nodes.value.find((n) => n.id === 'b');
  if (!middle) return;
  const incomers = getIncomers(middle, nodes.value, edges.value);
  const outgoers = getOutgoers(middle, nodes.value, edges.value);

  const newEdges: Edge[] = [];
  for (const inc of incomers)
    for (const out of outgoers)
      newEdges.push({ id: `${inc.id}->${out.id}`, source: inc.id, target: out.id });

  nodes.value = nodes.value.filter((n) => n.id !== 'b');
  edges.value = [...edges.value.filter((e) => e.source !== 'b' && e.target !== 'b'), ...newEdges];
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view>
    <Background variant="dots" />
    <Panel position="top-right">
      <button @click="deleteMiddle">delete B (auto-reconnect)</button>
    </Panel>
  </VueFlow>
</template>
