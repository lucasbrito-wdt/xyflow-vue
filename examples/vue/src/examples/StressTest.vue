<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Controls, MiniMap, type Node, type Edge } from '@xyflow/vue';

const COUNT = 500;
const COLS = 25;

const nodes = ref<Node[]>(
  Array.from({ length: COUNT }, (_, i) => ({
    id: `n${i}`,
    data: { label: `${i}` },
    position: { x: (i % COLS) * 90, y: Math.floor(i / COLS) * 60 },
  }))
);
const edges = ref<Edge[]>(
  Array.from({ length: COUNT - 1 }, (_, i) => ({
    id: `e${i}`,
    source: `n${i}`,
    target: `n${i + 1}`,
  }))
);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view :min-zoom="0.05">
    <Background variant="dots" />
    <Controls />
    <MiniMap />
  </VueFlow>
</template>
