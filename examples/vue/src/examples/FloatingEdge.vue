<script setup lang="ts">
import { computed } from 'vue';
import { BaseEdge, getBezierPath, Position, useInternalNode } from 'xyflow-vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  id: string;
  source: string;
  target: string;
  markerEnd?: string | Record<string, unknown>;
  style?: Record<string, string | number>;
}>();

const sourceNode = useInternalNode(props.source);
const targetNode = useInternalNode(props.target);

function intersect(src: any, tgt: any) {
  // center-to-center intersection with the source node rect
  const w = src.measured?.width ?? src.width ?? 100;
  const h = src.measured?.height ?? src.height ?? 40;
  const sx = src.internals.positionAbsolute.x + w / 2;
  const sy = src.internals.positionAbsolute.y + h / 2;
  const tw = tgt.measured?.width ?? tgt.width ?? 100;
  const th = tgt.measured?.height ?? tgt.height ?? 40;
  const tx = tgt.internals.positionAbsolute.x + tw / 2;
  const ty = tgt.internals.positionAbsolute.y + th / 2;

  const dx = tx - sx;
  const dy = ty - sy;
  const hx = w / 2;
  const hy = h / 2;
  const scaleX = dx === 0 ? Infinity : hx / Math.abs(dx);
  const scaleY = dy === 0 ? Infinity : hy / Math.abs(dy);
  const scale = Math.min(scaleX, scaleY);

  return { x: sx + dx * scale, y: sy + dy * scale };
}

function sidePos(src: any, x: number, y: number): Position {
  const w = src.measured?.width ?? src.width ?? 100;
  const h = src.measured?.height ?? src.height ?? 40;
  const cx = src.internals.positionAbsolute.x + w / 2;
  const cy = src.internals.positionAbsolute.y + h / 2;
  const px = x - cx;
  const py = y - cy;
  if (Math.abs(px) / w > Math.abs(py) / h) return px > 0 ? Position.Right : Position.Left;
  return py > 0 ? Position.Bottom : Position.Top;
}

const path = computed(() => {
  const s = sourceNode.value;
  const t = targetNode.value;
  if (!s || !t) return '';
  const sPt = intersect(s, t);
  const tPt = intersect(t, s);
  const [p] = getBezierPath({
    sourceX: sPt.x,
    sourceY: sPt.y,
    targetX: tPt.x,
    targetY: tPt.y,
    sourcePosition: sidePos(s, sPt.x, sPt.y),
    targetPosition: sidePos(t, tPt.x, tPt.y),
  });
  return p;
});
</script>

<template>
  <BaseEdge :id="id" :path="path" :marker-end="markerEnd" :style="style" />
</template>
