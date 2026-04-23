<script setup lang="ts">
import { ref } from 'vue';
import {
  VueFlow,
  Background,
  Controls,
  useVueFlow,
  VueFlowProvider,
  type Node,
  type Edge,
} from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: 'start', type: 'input', data: { label: 'Start here →' }, position: { x: 50, y: 50 } },
]);
const edges = ref<Edge[]>([]);

let counter = 1;

function onDragStart(event: DragEvent, type: string) {
  event.dataTransfer?.setData('application/vueflow', type);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
}
</script>

<template>
  <VueFlowProvider>
    <div style="display: flex; height: 100%">
      <aside
        style="
          padding: 12px;
          border-right: 1px solid #ddd;
          background: white;
          width: 160px;
        "
      >
        <div style="font-size: 12px; margin-bottom: 8px; color: #666">
          Drag into canvas →
        </div>
        <div
          v-for="t in ['default', 'input', 'output']"
          :key="t"
          draggable="true"
          :style="{
            padding: '8px 12px',
            marginBottom: '6px',
            border: '1px solid #777',
            borderRadius: 3,
            background: '#f7f7f7',
            cursor: 'grab',
            textAlign: 'center',
          }"
          @dragstart="onDragStart($event, t)"
        >
          {{ t }}
        </div>
      </aside>
      <div style="flex: 1; position: relative">
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          fit-view
          @dragover.prevent
          @drop="
            (ev) => {
              const type = ev.dataTransfer?.getData('application/vueflow');
              if (!type) return;
              const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect();
              const pos = { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
              nodes = [
                ...nodes,
                {
                  id: `n-${++counter}`,
                  type: type === 'default' ? undefined : (type as any),
                  position: pos,
                  data: { label: `${type} #${counter}` },
                },
              ];
            }
          "
        >
          <Background variant="dots" />
          <Controls />
        </VueFlow>
      </div>
    </div>
  </VueFlowProvider>
</template>
