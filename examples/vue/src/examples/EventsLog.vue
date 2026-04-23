<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { VueFlow, Background, Controls, type Node, type Edge } from '@xyflow/vue';

const nodes = ref<Node[]>([
  { id: '1', data: { label: 'Drag me' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Or me' }, position: { x: 300, y: 180 } },
]);
const edges = ref<Edge[]>([{ id: 'e', source: '1', target: '2' }]);

const log = shallowRef<string[]>([]);

function push(line: string) {
  log.value = [
    `${new Date().toLocaleTimeString()} — ${line}`,
    ...log.value.slice(0, 40),
  ];
}
</script>

<template>
  <div style="display: grid; grid-template-columns: 1fr 320px; height: 100%">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      fit-view
      @init="push('init')"
      @node-click="(_, n) => push(`nodeClick ${n.id}`)"
      @node-drag-start="(_, n) => push(`dragStart ${n.id}`)"
      @node-drag-stop="(_, n) => push(`dragStop ${n.id} (${n.position.x.toFixed(0)},${n.position.y.toFixed(0)})`)"
      @edge-click="(_, e) => push(`edgeClick ${e.id}`)"
      @pane-click="push('paneClick')"
      @move-end="(_, v) => push(`moveEnd zoom=${v.zoom.toFixed(2)}`)"
      @connect="(c) => push(`connect ${c.source}→${c.target}`)"
      @selection-change="(p) => push(`selChange n=${p.nodes.length} e=${p.edges.length}`)"
    >
      <Background variant="dots" />
      <Controls />
    </VueFlow>
    <aside
      style="
        border-left: 1px solid #ddd;
        padding: 10px;
        overflow: auto;
        font-family: ui-monospace, monospace;
        font-size: 11px;
        background: #111;
        color: #0f0;
      "
    >
      <div
        style="
          color: #888;
          margin-bottom: 8px;
          font-family: system-ui;
          font-size: 12px;
        "
      >
        Event log (last 40)
      </div>
      <div v-for="(line, i) in log" :key="i">{{ line }}</div>
    </aside>
  </div>
</template>
