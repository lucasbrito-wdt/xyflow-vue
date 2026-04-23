<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, getOutgoers, type Node, type Edge, type Connection } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: 'a', data: { label: 'A' }, position: { x: 50, y: 50 } },
  { id: 'b', data: { label: 'B' }, position: { x: 250, y: 50 } },
  { id: 'c', data: { label: 'C' }, position: { x: 450, y: 50 } },
]);
const edges = ref<Edge[]>([
  { id: 'ab', source: 'a', target: 'b' },
  { id: 'bc', source: 'b', target: 'c' },
]);

const isValidConnection = (c: Connection) => {
  if (c.source === c.target) return false;
  // DFS from target — if we reach source, it's a cycle
  const visited = new Set<string>();
  const stack: Node[] = [nodes.value.find((n) => n.id === c.target)!];
  while (stack.length) {
    const n = stack.pop()!;
    if (visited.has(n.id)) continue;
    visited.add(n.id);
    if (n.id === c.source) return false;
    stack.push(...getOutgoers(n, nodes.value, edges.value));
  }
  return true;
};

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
    Try connecting C → A (cycle, rejected)
  </div>
</template>
