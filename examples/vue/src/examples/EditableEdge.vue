<script setup lang="ts">
import { computed, ref } from 'vue';
import { BaseEdge, useVueFlow } from 'xyflow-vue';

defineOptions({ inheritAttrs: false });

type ControlPoint = { x: number; y: number };

const props = defineProps<{
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  data?: { points?: ControlPoint[] };
  style?: Record<string, string | number>;
  markerEnd?: string;
  selected?: boolean;
}>();

const flow = useVueFlow();

const points = computed<ControlPoint[]>(() => props.data?.points ?? [
  { x: (props.sourceX + props.targetX) / 2, y: (props.sourceY + props.targetY) / 2 - 40 },
]);

// Build a polyline through source → control points → target
const path = computed(() => {
  const all = [
    { x: props.sourceX, y: props.sourceY },
    ...points.value,
    { x: props.targetX, y: props.targetY },
  ];
  return all.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
});

const dragging = ref<number | null>(null);
const origin = ref<{ px: number; py: number; cx: number; cy: number } | null>(null);

function startDrag(idx: number, ev: MouseEvent) {
  ev.preventDefault();
  ev.stopPropagation();
  dragging.value = idx;
  origin.value = { px: ev.clientX, py: ev.clientY, cx: points.value[idx].x, cy: points.value[idx].y };
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
}

function onMove(ev: MouseEvent) {
  if (dragging.value === null || !origin.value) return;
  const vp = flow.getViewport();
  const dx = (ev.clientX - origin.value.px) / vp.zoom;
  const dy = (ev.clientY - origin.value.py) / vp.zoom;
  const idx = dragging.value;
  const next = points.value.slice();
  next[idx] = { x: origin.value.cx + dx, y: origin.value.cy + dy };
  flow.updateEdge(props.id, { data: { points: next } } as any);
}

function onUp() {
  dragging.value = null;
  origin.value = null;
  window.removeEventListener('mousemove', onMove);
  window.removeEventListener('mouseup', onUp);
}
</script>

<template>
  <BaseEdge :id="id" :path="path" :marker-end="markerEnd" :style="style" />
  <g v-if="selected">
    <circle
      v-for="(p, i) in points"
      :key="i"
      :cx="p.x"
      :cy="p.y"
      r="6"
      fill="#3578e5"
      stroke="white"
      stroke-width="2"
      style="cursor: grab; pointer-events: all"
      @mousedown="startDrag(i, $event)"
    />
  </g>
</template>
