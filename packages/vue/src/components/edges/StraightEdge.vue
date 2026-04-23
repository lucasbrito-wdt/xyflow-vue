<script setup lang="ts">
import { computed } from 'vue';
import { getStraightPath } from '@xyflow/system';
import BaseEdge from './BaseEdge.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  id?: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  markerStart?: string;
  markerEnd?: string;
  style?: any;
  interactionWidth?: number;
}>();

const path = computed(() => {
  const [p] = getStraightPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
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
