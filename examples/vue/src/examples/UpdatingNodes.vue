<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, Panel, useVueFlow, VueFlowProvider, type Node, type Edge } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: '1', data: { label: 'initial' }, position: { x: 200, y: 100 } },
]);
const edges = ref<Edge[]>([]);
</script>

<template>
  <VueFlowProvider>
    <Inner :nodes="nodes" :edges="edges" />
  </VueFlowProvider>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { VueFlow as _VF, Background as _BG, Panel as _P, useVueFlow as _uvf } from 'xyflow-vue';

export const Inner = defineComponent({
  props: ['nodes', 'edges'],
  setup(props) {
    const flow = _uvf();
    let tick = 0;
    const rename = () => flow.updateNodeData('1', { label: `updated #${++tick}` });
    return () =>
      h(_VF as any, { nodes: props.nodes, edges: props.edges, fitView: true }, () => [
        h(_BG as any, { variant: 'dots' }),
        h(_P as any, { position: 'top-right' }, () => [
          h('button', { onClick: rename }, 'update label'),
        ]),
      ]);
  },
});
</script>
