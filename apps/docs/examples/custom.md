# Custom Node

Build nodes with any Vue template. Register them via `nodeTypes` and wire handles with `<Handle>`. This demo uses a color-picker node that mutates its own data via `useVueFlow().updateNodeData`.

<ExampleFrame slug="custom" />

## Node component

```vue
<!-- ColorNode.vue -->
<script setup lang="ts">
import { Handle, Position, useVueFlow } from '@xyflow/vue';

const props = defineProps<{
  id: string;
  data: { color: string };
  selected?: boolean;
}>();
const flow = useVueFlow();

function setColor(c: string) {
  flow.updateNodeData(props.id, { color: c });
}
</script>

<template>
  <div :style="{ background: data.color, padding: 14, borderRadius: 6 }">
    <Handle type="target" :position="Position.Top" />
    <div>{{ data.color }}</div>
    <div style="display: flex; gap: 4px; justify-content: center">
      <button
        v-for="c in ['#ff6b6b', '#4ecdc4', '#ffe66d', '#6c5ce7']"
        :key="c"
        :style="{ width: 18, height: 18, background: c, borderRadius: '50%' }"
        @click.stop="setColor(c)"
      />
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
```

## Registration

```vue
<script setup lang="ts">
import { markRaw } from 'vue';
import { VueFlow } from '@xyflow/vue';
import ColorNode from './ColorNode.vue';

const nodeTypes = { color: markRaw(ColorNode) };
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :node-types="nodeTypes" />
</template>
```

**Always `markRaw()`** the components. Otherwise Vue proxies every internal field, which is pointless and slow for rendering.
