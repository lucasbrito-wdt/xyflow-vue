<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Controls, type Node, type Edge, type Connection } from 'xyflow-vue';
import UndoRedoPanel from './UndoRedoPanel.vue';

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'Drag me' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Change me' }, position: { x: 300, y: 200 } },
  { id: '3', type: 'output', data: { label: 'Connect us' }, position: { x: 500, y: 100 } },
]);
const edges = ref<Edge[]>([{ id: 'e1', source: '1', target: '2' }]);

function onConnect(c: Connection) {
  edges.value = [...edges.value, { id: `e-${c.source}-${c.target}`, ...c }];
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view @connect="onConnect">
    <Background variant="dots" />
    <Controls />
    <UndoRedoPanel />
  </VueFlow>
  <div
    style="
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      padding: 8px 14px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
    "
  >
    Try: drag a node · connect 2 → 3 · select an edge + Delete · then <b>Ctrl+Z</b> / <b>Ctrl+Shift+Z</b>
  </div>
</template>
