<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, useVueFlow, VueFlowProvider, type Node, type Edge } from 'xyflow-vue';

let id = 1;
const nodes = ref<Node[]>([
  { id: '0', type: 'input', data: { label: 'Drag from handle to empty space' }, position: { x: 100, y: 100 } },
]);
const edges = ref<Edge[]>([]);

function InnerFlow() {}
</script>

<template>
  <VueFlowProvider>
    <Inner :nodes-ref="nodes" :edges-ref="edges" />
  </VueFlowProvider>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { VueFlow as _VF, Background as _BG, useVueFlow as _uvf } from 'xyflow-vue';

export const Inner = defineComponent({
  props: ['nodesRef', 'edgesRef'],
  setup(props) {
    const flow = _uvf();
    const counter = { i: 1 };
    const lastSource = { id: null as string | null };

    const onConnectStart = (_ev: any, { nodeId }: any) => (lastSource.id = nodeId);
    const onConnectEnd = (ev: MouseEvent | TouchEvent) => {
      const target = ev.target as HTMLElement | null;
      if (!target || !target.classList.contains('vue-flow__pane')) return;
      const cx = (ev as MouseEvent).clientX ?? (ev as TouchEvent).changedTouches?.[0]?.clientX;
      const cy = (ev as MouseEvent).clientY ?? (ev as TouchEvent).changedTouches?.[0]?.clientY;
      const pos = flow.screenToFlowPosition({ x: cx, y: cy });
      const newId = `${++counter.i}`;
      props.nodesRef.push({ id: newId, data: { label: `Node ${newId}` }, position: pos });
      if (lastSource.id) props.edgesRef.push({ id: `e-${lastSource.id}-${newId}`, source: lastSource.id, target: newId });
    };

    return () =>
      h(_VF as any, {
        nodes: props.nodesRef,
        edges: props.edgesRef,
        fitView: true,
        onConnectStart,
        onConnectEnd,
      }, () => [h(_BG as any, { variant: 'dots' })]);
  },
});
</script>
