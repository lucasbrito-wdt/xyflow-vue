<script setup lang="ts">
import { computed } from 'vue';
import { Position, getEdgePosition } from '@xyflow/system';
import { useStore } from '../../store/context';
import EdgeWrapper from '../EdgeWrapper/EdgeWrapper.vue';

const store = useStore();

const layouted = computed(() => {
  // depend on nodes ref so we re-layout when node positions/measurements change
  void store.nodes.value;
  const result: Array<{
    edge: any;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourcePosition: Position;
    targetPosition: Position;
  }> = [];

  for (const edge of store.edges.value) {
    if (edge.hidden) continue;
    const sourceNode = store.nodeLookup.get(edge.source);
    const targetNode = store.nodeLookup.get(edge.target);
    if (!sourceNode || !targetNode) continue;

    const pos = getEdgePosition({
      id: edge.id,
      sourceNode,
      targetNode,
      sourceHandle: edge.sourceHandle ?? null,
      targetHandle: edge.targetHandle ?? null,
      connectionMode: store.connectionMode.value,
      onError: store.onError.value,
    });
    if (!pos) continue;

    result.push({
      edge,
      sourceX: pos.sourceX,
      sourceY: pos.sourceY,
      targetX: pos.targetX,
      targetY: pos.targetY,
      sourcePosition: pos.sourcePosition,
      targetPosition: pos.targetPosition,
    });
  }

  return result;
});
</script>

<template>
  <svg class="vue-flow__edges vue-flow__container">
    <g>
      <EdgeWrapper
        v-for="item in layouted"
        :key="item.edge.id"
        :edge="item.edge"
        :source-x="item.sourceX"
        :source-y="item.sourceY"
        :target-x="item.targetX"
        :target-y="item.targetY"
        :source-position="item.sourcePosition"
        :target-position="item.targetPosition"
      />
    </g>
  </svg>
</template>
