<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, type Node, type Edge } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: '1', data: { label: 'Right-click me' }, position: { x: 150, y: 100 } },
  { id: '2', data: { label: 'Or me' }, position: { x: 400, y: 200 } },
]);
const edges = ref<Edge[]>([]);

const menu = ref<{ x: number; y: number; nodeId: string } | null>(null);

function onNodeCtx(event: MouseEvent, node: Node) {
  event.preventDefault();
  menu.value = { x: event.clientX, y: event.clientY, nodeId: node.id };
}

function deleteNode() {
  if (!menu.value) return;
  nodes.value = nodes.value.filter((n) => n.id !== menu.value!.nodeId);
  menu.value = null;
}
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    fit-view
    @node-context-menu="onNodeCtx"
    @pane-click="menu = null"
  >
    <Background variant="dots" />
  </VueFlow>
  <div
    v-if="menu"
    :style="{
      position: 'fixed',
      top: `${menu.y}px`,
      left: `${menu.x}px`,
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: 4,
      padding: '4px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      zIndex: 1000,
    }"
    @click.stop
  >
    <div
      style="padding: 6px 14px; cursor: pointer"
      @click="deleteNode"
      @mouseenter="$event.currentTarget!.style.background = '#f0f0f0'"
      @mouseleave="$event.currentTarget!.style.background = 'white'"
    >
      Delete
    </div>
  </div>
</template>
