<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { VueFlow, Background, type Node, type Edge } from 'xyflow-vue';
import EditableEdge from './EditableEdge.vue';

const edgeTypes = { editable: markRaw(EditableEdge) };

const nodes = ref<Node[]>([
  { id: 'a', data: { label: 'A' }, position: { x: 100, y: 150 } },
  { id: 'b', data: { label: 'B' }, position: { x: 500, y: 250 } },
]);
const edges = ref<Edge[]>([
  {
    id: 'e',
    source: 'a',
    target: 'b',
    type: 'editable',
    data: { points: [{ x: 300, y: 80 }, { x: 380, y: 330 }] } as any,
  },
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :edge-types="edgeTypes" fit-view>
    <Background variant="dots" />
  </VueFlow>
  <div style="position: absolute; top: 10px; right: 10px; background: white; padding: 8px; border: 1px solid #ddd; font-size: 12px">
    Click the edge to select it, then drag the blue dots.
  </div>
</template>
