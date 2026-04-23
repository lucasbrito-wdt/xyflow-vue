<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Controls, type Node, type Edge } from '@xyflow/vue';

// A parent "group" node containing two child nodes with `extent: 'parent'`.
// The system will clamp child positions inside the group during drag.
const nodes = ref<Node[]>([
  {
    id: 'group-1',
    type: 'group',
    position: { x: 50, y: 50 },
    data: {},
    width: 400,
    height: 250,
    style: { backgroundColor: 'rgba(120, 130, 230, 0.1)' } as any,
  },
  {
    id: 'child-1',
    data: { label: 'Child 1 (contained)' },
    position: { x: 40, y: 60 },
    parentId: 'group-1',
    extent: 'parent',
  },
  {
    id: 'child-2',
    data: { label: 'Child 2 (contained)' },
    position: { x: 200, y: 140 },
    parentId: 'group-1',
    extent: 'parent',
  },
  {
    id: 'outside',
    data: { label: 'Outside' },
    position: { x: 520, y: 150 },
  },
]);

const edges = ref<Edge[]>([
  { id: 'e1', source: 'child-1', target: 'child-2' },
  { id: 'e2', source: 'child-2', target: 'outside' },
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view>
    <Background variant="dots" />
    <Controls />
  </VueFlow>
</template>
