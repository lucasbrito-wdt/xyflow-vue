<script setup lang="ts">
import { ref, markRaw } from 'vue';
import Overview from './examples/Overview.vue';
import CustomNode from './examples/CustomNode.vue';
import DragAndDrop from './examples/DragAndDrop.vue';
import Subflow from './examples/Subflow.vue';
import EventsLog from './examples/EventsLog.vue';
import NodeToolbarDemo from './examples/NodeToolbarDemo.vue';
import NodeResizerDemo from './examples/NodeResizerDemo.vue';
import EdgeTypes from './examples/EdgeTypes.vue';
import EdgeMarkers from './examples/EdgeMarkers.vue';
import Validation from './examples/Validation.vue';
import AddNodeOnEdgeDrop from './examples/AddNodeOnEdgeDrop.vue';
import SaveRestore from './examples/SaveRestore.vue';
import ContextMenu from './examples/ContextMenu.vue';
import UpdatingNodes from './examples/UpdatingNodes.vue';
import DeleteMiddleNode from './examples/DeleteMiddleNode.vue';
import HorizontalFlow from './examples/HorizontalFlow.vue';
import DarkMode from './examples/DarkMode.vue';
import ConnectionLimit from './examples/ConnectionLimit.vue';
import PreventingCycles from './examples/PreventingCycles.vue';
import StressTest from './examples/StressTest.vue';
import UndoRedoDemo from './examples/UndoRedoDemo.vue';
import DagreLayout from './examples/DagreLayout.vue';
import FloatingEdges from './examples/FloatingEdges.vue';
import EditableEdgeDemo from './examples/EditableEdgeDemo.vue';
import ReconnectEdge from './examples/ReconnectEdge.vue';

const groups = {
  Basics: {
    overview: { label: 'Overview', comp: markRaw(Overview) },
    custom: { label: 'Custom Node', comp: markRaw(CustomNode) },
    dnd: { label: 'Drag & Drop', comp: markRaw(DragAndDrop) },
    events: { label: 'Events Log', comp: markRaw(EventsLog) },
    updating: { label: 'Updating Nodes', comp: markRaw(UpdatingNodes) },
    saveRestore: { label: 'Save & Restore', comp: markRaw(SaveRestore) },
  },
  Nodes: {
    toolbar: { label: 'Node Toolbar', comp: markRaw(NodeToolbarDemo) },
    resizer: { label: 'Node Resizer', comp: markRaw(NodeResizerDemo) },
    deleteMiddle: { label: 'Delete Middle Node', comp: markRaw(DeleteMiddleNode) },
    subflow: { label: 'Subflow', comp: markRaw(Subflow) },
    stress: { label: 'Stress Test (500)', comp: markRaw(StressTest) },
  },
  Edges: {
    types: { label: 'Edge Types', comp: markRaw(EdgeTypes) },
    markers: { label: 'Edge Markers', comp: markRaw(EdgeMarkers) },
    floating: { label: 'Floating Edges', comp: markRaw(FloatingEdges) },
    editable: { label: 'Editable Edge', comp: markRaw(EditableEdgeDemo) },
    reconnect: { label: 'Reconnect Edge', comp: markRaw(ReconnectEdge) },
  },
  Interaction: {
    validation: { label: 'Validation', comp: markRaw(Validation) },
    addOnDrop: { label: 'Add Node On Edge Drop', comp: markRaw(AddNodeOnEdgeDrop) },
    ctxMenu: { label: 'Context Menu', comp: markRaw(ContextMenu) },
    limit: { label: 'Connection Limit', comp: markRaw(ConnectionLimit) },
    cycles: { label: 'Preventing Cycles', comp: markRaw(PreventingCycles) },
    undoRedo: { label: 'Undo / Redo', comp: markRaw(UndoRedoDemo) },
  },
  Layout: {
    horizontal: { label: 'Horizontal Flow', comp: markRaw(HorizontalFlow) },
    dagre: { label: 'Dagre Tree', comp: markRaw(DagreLayout) },
  },
  Styling: {
    dark: { label: 'Dark Mode', comp: markRaw(DarkMode) },
  },
} as const;

// ?demo=<key> activates embed mode (used by docs iframe)
const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
const embedKey = urlParams.get('demo');
const embed = ref(!!embedKey);
const active = ref<string>(embedKey || 'overview');

function find(key: string) {
  for (const g of Object.values(groups)) {
    if ((g as any)[key]) return (g as any)[key];
  }
  return (groups as any).Basics.overview;
}
</script>

<template>
  <div v-if="embed" style="width: 100vw; height: 100vh">
    <component :is="find(active).comp" :key="active" />
  </div>
  <div v-else style="display: flex; height: 100vh">
    <aside
      style="
        width: 220px;
        padding: 12px;
        border-right: 1px solid #ddd;
        background: #fafafa;
        overflow-y: auto;
      "
    >
      <h3 style="margin: 0 0 12px; font-size: 14px">xyflow-vue demos</h3>
      <template v-for="(items, group) in groups" :key="group">
        <div style="font-size: 11px; text-transform: uppercase; color: #888; margin: 12px 0 4px; font-weight: 600">
          {{ group }}
        </div>
        <button
          v-for="(item, key) in items"
          :key="key"
          :style="{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '6px 10px',
            marginBottom: '2px',
            background: active === key ? '#1a192b' : 'white',
            color: active === key ? 'white' : '#222',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }"
          @click="active = key as string"
        >
          {{ item.label }}
        </button>
      </template>
    </aside>
    <main style="flex: 1; position: relative">
      <component :is="find(active).comp" :key="active" />
    </main>
  </div>
</template>
