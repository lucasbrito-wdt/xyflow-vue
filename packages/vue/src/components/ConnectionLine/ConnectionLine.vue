<script setup lang="ts">
import { computed } from 'vue';
import { getBezierPath, getSmoothStepPath, getStraightPath, ConnectionLineType, Position } from '@xyflow/system';
import { useStore } from '../../store/context';

const props = withDefaults(
  defineProps<{
    type?: ConnectionLineType;
    style?: Record<string, string | number>;
  }>(),
  { type: ConnectionLineType.Bezier }
);

const store = useStore() as any;

const data = computed(() => {
  const c = store.connection.value;
  if (!c.inProgress) return null;
  const { from, to, fromPosition, toPosition } = c;
  if (!from || !to) return null;

  const args = {
    sourceX: from.x,
    sourceY: from.y,
    targetX: to.x,
    targetY: to.y,
    sourcePosition: fromPosition ?? Position.Bottom,
    targetPosition: toPosition ?? Position.Top,
  };

  let d: string;
  if (props.type === ConnectionLineType.Straight) {
    [d] = getStraightPath(args);
  } else if (
    props.type === ConnectionLineType.Step ||
    props.type === ConnectionLineType.SmoothStep
  ) {
    [d] = getSmoothStepPath({ ...args, borderRadius: props.type === ConnectionLineType.Step ? 0 : undefined });
  } else {
    [d] = getBezierPath(args);
  }
  return d;
});
</script>

<template>
  <svg v-if="data" class="vue-flow__connectionline vue-flow__container">
    <g>
      <path :d="data" class="vue-flow__connection-path" fill="none" :style="style" />
    </g>
  </svg>
</template>
