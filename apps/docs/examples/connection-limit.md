# Connection Limit

Limit how many edges a handle accepts. Use `useNodeConnections` inside the custom node to count current connections and toggle `isConnectable` on the handle.

<ExampleFrame slug="limit" />

```vue
<!-- LimitedNode.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { Handle, Position, useNodeConnections } from 'xyflow-vue';

defineProps<{ id: string; data: { label: string } }>();

const connections = useNodeConnections({ handleType: 'target' });
const isConnectable = computed(() => connections.value.length < 2);
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Left" :is-connectable="isConnectable" />
    <div>{{ data.label }}</div>
    <div>{{ connections.length }}/2 connected</div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>
```
