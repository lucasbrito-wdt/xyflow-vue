<script setup lang="ts">
import { computed } from 'vue';
import { getBezierPath, Position } from '@xyflow/system';
import BaseEdge from './BaseEdge.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  id?: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition?: Position;
  targetPosition?: Position;
  markerStart?: string;
  markerEnd?: string;
  style?: any;
  interactionWidth?: number;
}>();

const path = computed(() => {
  const [p] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition ?? Position.Bottom,
    targetPosition: props.targetPosition ?? Position.Top,
  });
  return p;
});
</script>

<template>
  <BaseEdge
    :id="id"
    :path="path"
    :marker-start="markerStart"
    :marker-end="markerEnd"
    :style="style"
    :interaction-width="interactionWidth"
  />
</template>
