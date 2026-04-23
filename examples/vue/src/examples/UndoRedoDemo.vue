<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Controls, Panel, VueFlowProvider, type Node, type Edge } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'Drag me' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Change me' }, position: { x: 300, y: 200 } },
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
import {
  VueFlow as _VF,
  Background as _BG,
  Controls as _C,
  Panel as _P,
  useUndoRedo,
} from 'xyflow-vue';

export const Inner = defineComponent({
  props: ['nodes', 'edges'],
  setup(props) {
    const { undo, redo, canUndo, canRedo, clear } = useUndoRedo();
    return () =>
      h(_VF as any, { nodes: props.nodes, edges: props.edges, fitView: true }, () => [
        h(_BG as any, { variant: 'dots' }),
        h(_C as any),
        h(_P as any, { position: 'top-right' }, () => [
          h('button', { onClick: undo, disabled: !canUndo.value }, '↶ undo (Ctrl+Z)'),
          h('button', { onClick: redo, disabled: !canRedo.value, style: 'margin-left:4px' }, '↷ redo (Ctrl+Shift+Z)'),
          h('button', { onClick: clear, style: 'margin-left:4px' }, 'clear history'),
        ]),
      ]);
  },
});
</script>
