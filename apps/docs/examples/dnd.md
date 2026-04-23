# Drag & Drop

Drag HTML elements from the sidebar and drop them into the canvas to spawn nodes at the drop position. Uses `screenToFlowPosition` from `useVueFlow()` and HTML5 DataTransfer.

<ExampleFrame slug="dnd" />

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, VueFlowProvider, type Node, type Edge } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: 'start', type: 'input', data: { label: 'Start here' }, position: { x: 50, y: 50 } },
]);
const edges = ref<Edge[]>([]);
let counter = 1;

function onDragStart(event: DragEvent, type: string) {
  event.dataTransfer?.setData('application/vueflow', type);
}

function onDrop(ev: DragEvent) {
  const type = ev.dataTransfer?.getData('application/vueflow');
  if (!type) return;
  const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect();
  const pos = { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  nodes.value = [
    ...nodes.value,
    {
      id: `n-${++counter}`,
      type: type === 'default' ? undefined : (type as any),
      position: pos,
      data: { label: `${type} #${counter}` },
    },
  ];
}
</script>

<template>
  <VueFlowProvider>
    <aside>
      <div
        v-for="t in ['default', 'input', 'output']"
        :key="t"
        draggable="true"
        @dragstart="onDragStart($event, t)"
      >
        {{ t }}
      </div>
    </aside>
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      fit-view
      @dragover.prevent
      @drop="onDrop"
    >
      <Background variant="dots" />
    </VueFlow>
  </VueFlowProvider>
</template>
```
