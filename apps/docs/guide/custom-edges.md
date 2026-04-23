# Custom edges

An edge component receives source/target coords and renders an SVG path. Use `<BaseEdge>` to keep the standard class names (and get pointer-event handling for free).

```vue
<!-- DashedEdge.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { BaseEdge, getBezierPath, Position } from 'xyflow-vue';

const props = defineProps<{
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition?: Position;
  targetPosition?: Position;
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
  <BaseEdge :id="id" :path="path" :style="{ stroke: '#ff6b6b', strokeDasharray: '5,5' }" />
</template>
```

```vue
<VueFlow :edge-types="{ dashed: markRaw(DashedEdge) }" ... />
<!-- then use type: 'dashed' on any edge -->
```

## Path helpers

Re-exported from `@xyflow/system`:

- `getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, curvature? })`
- `getSmoothStepPath({ ..., borderRadius? })`
- `getStraightPath({ sourceX, sourceY, targetX, targetY })`

All return `[path: string, labelX: number, labelY: number, offsetX: number, offsetY: number]`.

## Edge labels

Use `<EdgeLabel>`:

```vue
<BaseEdge :path="path" />
<EdgeLabel :x="labelX" :y="labelY">⚡ edge label</EdgeLabel>
```

## Built-in edge types

| Type         | Component        |
|--------------|------------------|
| `default`    | BezierEdge       |
| `straight`   | StraightEdge     |
| `step`       | StepEdge         |
| `smoothstep` | SmoothStepEdge   |

Next: **[State management →](./state)**
