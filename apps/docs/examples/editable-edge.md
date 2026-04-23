# Editable Edge

A custom edge with draggable control points. The path becomes a polyline through `data.points`, and each point renders as a blue circle when the edge is selected.

<ExampleFrame slug="editable" />

```vue
<!-- EditableEdge.vue (abbreviated) -->
<script setup lang="ts">
import { computed, ref } from 'vue';
import { BaseEdge, useVueFlow } from 'xyflow-vue';

const props = defineProps<{
  id: string;
  sourceX: number; sourceY: number;
  targetX: number; targetY: number;
  data?: { points?: { x: number; y: number }[] };
  selected?: boolean;
}>();

const flow = useVueFlow();
const points = computed(() => props.data?.points ?? []);

const path = computed(() => {
  const all = [
    { x: props.sourceX, y: props.sourceY },
    ...points.value,
    { x: props.targetX, y: props.targetY },
  ];
  return all.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
});

function startDrag(idx: number, ev: MouseEvent) {
  // translate mouse delta by inverse viewport zoom
  // then flow.updateEdge(id, { data: { points: newPoints } })
}
</script>

<template>
  <BaseEdge :id="id" :path="path" />
  <g v-if="selected">
    <circle v-for="(p, i) in points" :key="i" :cx="p.x" :cy="p.y" r="6"
            fill="#3578e5" @mousedown="startDrag(i, $event)" />
  </g>
</template>
```

Click the edge to select it, then drag the blue dots. The control points live in `edge.data` and are persisted like any other edge data.
