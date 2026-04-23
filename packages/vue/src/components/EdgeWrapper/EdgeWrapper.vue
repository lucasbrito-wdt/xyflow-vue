<script setup lang="ts">
import { computed } from 'vue';
import { Position } from '@xyflow/system';
import { useStore } from '../../store/context';
import BezierEdge from '../edges/BezierEdge.vue';
import StraightEdge from '../edges/StraightEdge.vue';
import SmoothStepEdge from '../edges/SmoothStepEdge.vue';
import StepEdge from '../edges/StepEdge.vue';
import EdgeReconnectAnchor from '../EdgeReconnectAnchor/EdgeReconnectAnchor.vue';

const props = defineProps<{
  edge: any;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
}>();

const store = useStore();

const builtIn: Record<string, any> = {
  default: BezierEdge,
  straight: StraightEdge,
  smoothstep: SmoothStepEdge,
  step: StepEdge,
};

const EdgeComponent = computed(() => {
  const type = props.edge.type ?? 'default';
  return store.edgeTypes.value[type] ?? builtIn[type] ?? BezierEdge;
});

// Show reconnect anchors when edge is selected AND reconnectable !== false
const showReconnect = computed(() => !!props.edge.selected && props.edge.reconnectable !== false);
</script>

<template>
  <g
    class="vue-flow__edge"
    :class="{ selected: edge.selected }"
    :data-id="edge.id"
    @click="(store as any)._emitEdgeClick?.($event, edge)"
    @dblclick="(store as any)._emitEdgeDblClick?.($event, edge)"
    @contextmenu="(store as any)._emitEdgeContextMenu?.($event, edge)"
    @mouseenter="(store as any)._emitEdgeMouseEnter?.($event, edge)"
    @mousemove="(store as any)._emitEdgeMouseMove?.($event, edge)"
    @mouseleave="(store as any)._emitEdgeMouseLeave?.($event, edge)"
  >
    <component
      :is="(EdgeComponent as any)"
      :id="edge.id"
      :source="edge.source"
      :target="edge.target"
      :source-x="sourceX"
      :source-y="sourceY"
      :target-x="targetX"
      :target-y="targetY"
      :source-position="sourcePosition"
      :target-position="targetPosition"
      :selected="!!edge.selected"
      :data="edge.data"
      :label="edge.label"
      :style="edge.style"
      :marker-start="edge.markerStart"
      :marker-end="edge.markerEnd"
      :interaction-width="edge.interactionWidth"
    />
    <EdgeReconnectAnchor
      v-if="showReconnect"
      type="source"
      :edge-id="edge.id"
      :x="sourceX"
      :y="sourceY"
    />
    <EdgeReconnectAnchor
      v-if="showReconnect"
      type="target"
      :edge-id="edge.id"
      :x="targetX"
      :y="targetY"
    />
  </g>
</template>
