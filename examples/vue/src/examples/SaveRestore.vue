<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VueFlow, Background, Controls, Panel, useVueFlow, VueFlowProvider, type Node, type Edge } from 'xyflow-vue';

const STORAGE_KEY = 'xyflow-vue-demo-save';

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'A' }, position: { x: 100, y: 50 } },
  { id: '2', data: { label: 'B' }, position: { x: 100, y: 180 } },
]);
const edges = ref<Edge[]>([{ id: 'e', source: '1', target: '2' }]);
</script>

<template>
  <VueFlowProvider>
    <Inner v-model:nodes="nodes" v-model:edges="edges" />
  </VueFlowProvider>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { VueFlow as _VF, Background as _BG, Controls as _C, Panel as _P, useVueFlow as _uvf } from 'xyflow-vue';

export const Inner = defineComponent({
  props: ['nodes', 'edges'],
  emits: ['update:nodes', 'update:edges'],
  setup(props, { emit }) {
    const flow = _uvf();

    const save = () => {
      const flowData = flow.toObject();
      localStorage.setItem('xyflow-vue-demo-save', JSON.stringify(flowData));
    };
    const restore = () => {
      const raw = localStorage.getItem('xyflow-vue-demo-save');
      if (!raw) return;
      const d = JSON.parse(raw);
      emit('update:nodes', d.nodes);
      emit('update:edges', d.edges);
      flow.setViewport(d.viewport);
    };

    return () =>
      h(_VF as any, { nodes: props.nodes, edges: props.edges, fitView: true }, () => [
        h(_BG as any, { variant: 'dots' }),
        h(_C as any),
        h(_P as any, { position: 'top-right' }, () => [
          h('button', { onClick: save, style: 'margin-right:4px' }, 'save'),
          h('button', { onClick: restore }, 'restore'),
        ]),
      ]);
  },
});
</script>
