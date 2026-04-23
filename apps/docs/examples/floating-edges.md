# Floating Edges

Edges connect to the **nearest side** of each node rather than to fixed handles. Useful for flow charts where you want visual clarity regardless of node positions.

<ExampleFrame slug="floating" />

```vue
<!-- FloatingEdge.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { BaseEdge, getBezierPath, Position, useInternalNode } from 'xyflow-vue';

const props = defineProps<{ id: string; source: string; target: string; style?: any; markerEnd?: string }>();
const sourceNode = useInternalNode(props.source);
const targetNode = useInternalNode(props.target);

// Intersect the line between node centers with the source node's bounding box
function intersect(src, tgt) { /* ... see source for math */ }
function sidePos(src, x, y): Position { /* ... */ }

const path = computed(() => {
  const s = sourceNode.value, t = targetNode.value;
  if (!s || !t) return '';
  const sPt = intersect(s, t);
  const tPt = intersect(t, s);
  const [p] = getBezierPath({
    sourceX: sPt.x, sourceY: sPt.y,
    targetX: tPt.x, targetY: tPt.y,
    sourcePosition: sidePos(s, sPt.x, sPt.y),
    targetPosition: sidePos(t, tPt.x, tPt.y),
  });
  return p;
});
</script>

<template>
  <BaseEdge :id="id" :path="path" :marker-end="markerEnd" :style="style" />
</template>
```

The node still needs a `<Handle>` for the user to initiate connections from — but the drawn edge ignores handle positions and routes from the nearest face.
